import { ConflictException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ListBooksDto } from './dto/list-books.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(query: ListBooksDto) {
    const where: Prisma.BookWhereInput = {
      ...(query.search ? { OR: [
        { title: { contains: query.search, mode: 'insensitive' } },
        { author: { contains: query.search, mode: 'insensitive' } },
      ] } : {}),
      ...(query.genre ? { genre: { slug: query.genre } } : {}),
      ...(query.available ? { availableCopies: { gt: 0 } } : {}),
    };
    return this.prisma.book.findMany({
      where,
      select: {
        id: true, title: true, author: true, isbn: true, totalCopies: true,
        availableCopies: true, genreId: true, createdAt: true,
        genre: true,
      },
      orderBy: { title: 'asc' },
    });
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({ where: { id }, include: { genre: true } });
    if (!book) throw new NotFoundException(`Book ${id} not found`);
    return book;
  }

  async create(dto: CreateBookDto) {
    this.assertCopies(dto.availableCopies, dto.totalCopies);
    try { return await this.prisma.book.create({ data: dto, include: { genre: true } }); }
    catch (error) { this.handlePrismaError(error); }
  }

  async update(id: number, dto: UpdateBookDto) {
    const existing = await this.prisma.book.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Book ${id} not found`);
    this.assertCopies(dto.availableCopies ?? existing.availableCopies, dto.totalCopies ?? existing.totalCopies);
    try { return await this.prisma.book.update({ where: { id }, data: dto, include: { genre: true } }); }
    catch (error) { this.handlePrismaError(error); }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.book.delete({ where: { id } });
  }

  private assertCopies(available: number, total: number) {
    if (available > total) throw new BadRequestException('availableCopies must be between 0 and totalCopies');
  }

  private handlePrismaError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') throw new ConflictException('A book with this ISBN already exists');
      if (error.code === 'P2003') throw new BadRequestException('The selected genre does not exist');
      if (error.code === 'P2025') throw new NotFoundException('Book not found');
    }
    throw error;
  }
}
