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

  private generateCode(length = 6) {
    return Math.random().toString(36).substring(2, 2 + length);
  }
  
async create(createShorturlDto: CreateShorturlDto,  userId: string): Promise<Shorturl> {
  const shorturl = this.shorturlRepository.create({ 
    short_origin: createShorturlDto.short_origin, 
    short_url: this.generateCode(),
    user_id: userId
  });
   console.log(shorturl)
  return await this.shorturlRepository.save(shorturl);
}


  findAll(): Promise<Shorturl[]> {

    return this.shorturlRepository.find({ relations: ['user'] },);
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
