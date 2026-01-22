import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShorturlService } from './shorturl.service';
import { CreateShorturlDto } from './dto/create-shorturl.dto';
import { UpdateShorturlDto } from './dto/update-shorturl.dto';

@Controller('shorturl')
export class ShorturlController {
  constructor(private readonly shorturlService: ShorturlService) {}

  @Post()
  create(@Body() createShorturlDto: CreateShorturlDto) {
    return this.shorturlService.create(createShorturlDto);
  }

  @Get()
  findAll() {
    return this.shorturlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shorturlService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShorturlDto: UpdateShorturlDto) {
    return this.shorturlService.update(+id, updateShorturlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shorturlService.remove(+id);
  }
}
