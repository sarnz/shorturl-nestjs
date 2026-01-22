import { Module } from '@nestjs/common';
import { ShorturlService } from './shorturl.service';
import { ShorturlController } from './shorturl.controller';
import { Shorturl } from './entities/shorturl.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [
    TypeOrmModule.forFeature([Shorturl]), 
  ],
  controllers: [ShorturlController],
  providers: [ShorturlService],
})
export class ShorturlModule {}
