import { Injectable } from '@nestjs/common';
import { CreateShorturlDto } from './dto/create-shorturl.dto';
import { UpdateShorturlDto } from './dto/update-shorturl.dto';
import { Shorturl } from './entities/shorturl.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ShorturlService {

    constructor(
    @InjectRepository(Shorturl)
    private shorturlRepository: Repository<Shorturl>,
  ) {}


  create(createShorturlDto: CreateShorturlDto) {
    return 'This action adds a new shorturl';
  }


  findAll(): Promise<Shorturl[]> {

    return this.shorturlRepository.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} shorturl`;
  }

  update(id: number, updateShorturlDto: UpdateShorturlDto) {
    return `This action updates a #${id} shorturl`;
  }

  remove(id: number) {
    return `This action removes a #${id} shorturl`;
  }
}
