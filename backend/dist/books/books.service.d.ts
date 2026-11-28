import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ListBooksDto } from './dto/list-books.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BooksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(query: ListBooksDto): Prisma.PrismaPromise<{
        genre: {
            id: number;
            name: string;
            slug: string;
        };
        title: string;
        author: string;
        isbn: string;
        totalCopies: number;
        availableCopies: number;
        genreId: number;
        id: number;
        createdAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        genre: {
            id: number;
            name: string;
            slug: string;
        };
    } & {
        title: string;
        author: string;
        isbn: string;
        totalCopies: number;
        availableCopies: number;
        genreId: number;
        content: string | null;
        id: number;
        createdAt: Date;
    }>;
    create(dto: CreateBookDto): Promise<{
        genre: {
            id: number;
            name: string;
            slug: string;
        };
    } & {
        title: string;
        author: string;
        isbn: string;
        totalCopies: number;
        availableCopies: number;
        genreId: number;
        content: string | null;
        id: number;
        createdAt: Date;
    }>;
    update(id: number, dto: UpdateBookDto): Promise<{
        genre: {
            id: number;
            name: string;
            slug: string;
        };
    } & {
        title: string;
        author: string;
        isbn: string;
        totalCopies: number;
        availableCopies: number;
        genreId: number;
        content: string | null;
        id: number;
        createdAt: Date;
    }>;
    remove(id: number): Promise<{
        title: string;
        author: string;
        isbn: string;
        totalCopies: number;
        availableCopies: number;
        genreId: number;
        content: string | null;
        id: number;
        createdAt: Date;
    }>;
    private assertCopies;
    private handlePrismaError;
}
