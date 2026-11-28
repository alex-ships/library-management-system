import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ListBooksDto } from './dto/list-books.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    findAll(query: ListBooksDto): import("@prisma/client").Prisma.PrismaPromise<{
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
    findForReading(id: number): Promise<{
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
}
