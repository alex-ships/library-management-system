"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let BooksService = class BooksService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(query) {
        const where = {
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
    async findOne(id) {
        const book = await this.prisma.book.findUnique({ where: { id }, include: { genre: true } });
        if (!book)
            throw new common_1.NotFoundException(`Book ${id} not found`);
        return book;
    }
    async create(dto) {
        this.assertCopies(dto.availableCopies, dto.totalCopies);
        try {
            return await this.prisma.book.create({ data: dto, include: { genre: true } });
        }
        catch (error) {
            this.handlePrismaError(error);
        }
    }
    async update(id, dto) {
        const existing = await this.prisma.book.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Book ${id} not found`);
        this.assertCopies(dto.availableCopies ?? existing.availableCopies, dto.totalCopies ?? existing.totalCopies);
        try {
            return await this.prisma.book.update({ where: { id }, data: dto, include: { genre: true } });
        }
        catch (error) {
            this.handlePrismaError(error);
        }
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.book.delete({ where: { id } });
    }
    assertCopies(available, total) {
        if (available > total)
            throw new common_1.BadRequestException('availableCopies must be between 0 and totalCopies');
    }
    handlePrismaError(error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002')
                throw new common_1.ConflictException('A book with this ISBN already exists');
            if (error.code === 'P2003')
                throw new common_1.BadRequestException('The selected genre does not exist');
            if (error.code === 'P2025')
                throw new common_1.NotFoundException('Book not found');
        }
        throw error;
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BooksService);
//# sourceMappingURL=books.service.js.map