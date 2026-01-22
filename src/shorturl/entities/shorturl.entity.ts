import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';


@Entity('shorturls')
export class Shorturl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  short_url: string;

  @Column()
  short_origin: string;

@Column()
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' }) // 
  user: User;

}
