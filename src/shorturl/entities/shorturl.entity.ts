import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';


@Entity('shorturls')
export class Shorturl {
  @PrimaryGeneratedColumn()
  id: number;

   @Column({ unique: true })
  short_url: string;

  @Column()
  short_origin: string;

@Column()
  user_id: string;

  // @OneToOne(() => User)
  // @JoinColumn({ name: 'user_id' }) // 
  // user: User;

  @ManyToOne(() => User, (user) => user.shorturls, { eager: false })
  @JoinColumn({ name: 'user_id' }) // 👈 บอกให้ใช้ column user_id
  user: User;

}
