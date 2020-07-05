import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('photo')
export class PhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  path: string;

  @ManyToOne((type) => UserEntity, (user) => user.photos)
  user: UserEntity;
}

export interface Photo {
  id: number;
  title: string;
  path: string;
}
