import { isString, IsString, IsUrl } from 'class-validator';

export class CreateShorturlDto {
  @IsString()
  short_origin: string;

}
