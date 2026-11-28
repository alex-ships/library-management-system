import { GenresService } from './genres.service';
export declare class GenresController {
    private readonly genresService;
    constructor(genresService: GenresService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        slug: string;
    }[]>;
}
