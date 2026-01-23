import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req} from '@nestjs/common';
import { ShorturlService } from './shorturl.service';
import { CreateShorturlDto } from './dto/create-shorturl.dto';
import { UpdateShorturlDto } from './dto/update-shorturl.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('shorturl')
export class ShorturlController {
  constructor(private readonly shorturlService: ShorturlService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createShorturlDto: CreateShorturlDto, @Req() req) {
    return this.shorturlService.create(createShorturlDto,  req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
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
