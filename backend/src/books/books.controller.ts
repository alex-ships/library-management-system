import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ListBooksDto } from './dto/list-books.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get() findAll(@Query() query: ListBooksDto) { return this.booksService.findAll(query); }
  @Get(':id/read') findForReading(@Param('id', ParseIntPipe) id: number) { return this.booksService.findOne(id); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.booksService.findOne(id); }
  @Post() create(@Body() dto: CreateBookDto) { return this.booksService.create(dto); }
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookDto) { return this.booksService.update(id, dto); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.booksService.remove(id); }
}
