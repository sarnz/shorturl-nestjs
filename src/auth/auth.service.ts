
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ChangePasswordDto } from './dto/change-password.dto'
import { User } from '../user/entities/user.entity';
import { Shorturl } from '../shorturl/entities/shorturl.entity';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(

        @InjectRepository(User)
    private userRepository: Repository<User>,

    
        @InjectRepository(Shorturl)
    private shorturlRepository: Repository<Shorturl>,


    private usersService: UsersService,
    private jwtService: JwtService,
    
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    
  if (!user) {
    return null;
  }

  
    const isMatch = await bcrypt.compare(pass.trim(), user.password);

  if (!isMatch) {
    return 'รหัสผ่านไม่ถูกต้อง';
  }

  const { password, ...result } = user;
  return result;

  }

  async login(user: any) {
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
async myShorturl(userId: number) {
  const user = await this.userRepository.findOne({
    where: { id: userId },
    relations: ['shorturls'],
  });

  if (!user) {
    return 'ไม่พบข้อมูล';
  }

  return user.shorturls;
}

  
async changePassword(
  userId: number,
  dto: ChangePasswordDto,
) {
  const user = await this.userRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new UnauthorizedException();
  }

  

  
  const isMatch = await bcrypt.compare(
    dto.oldPassword,
    user.password,
  );

  if (!isMatch) {
    throw new BadRequestException('รหัสผ่านเดิมไม่ถูกต้อง');
  }


  const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

  user.password = hashedPassword;
  await this.userRepository.save(user);

  return {
    message: 'เปลี่ยนรหัสผ่านสำเร็จ',
  };
}
}
