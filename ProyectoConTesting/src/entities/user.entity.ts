import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PhotoEntity } from './photo.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  firstName: string;

  @Column('varchar', { length: 50 })
  lastName: string;

  @Column('varchar', { length: 200 })
  email: string;

  @Column('varchar', { length: 100 })
  password: string;

  @OneToMany((type) => PhotoEntity, (photo) => photo.user)
  photos: PhotoEntity[];
}

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}
