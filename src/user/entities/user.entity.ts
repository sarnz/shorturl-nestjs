
import { Shorturl } from 'src/shorturl/entities/shorturl.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  email: string;

    @Column()
  password: string;


  
      @OneToMany(() => Shorturl, (shorturl) => shorturl.user)
    shorturls: Shorturl[]


}
