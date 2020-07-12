import {
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  Model,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Task extends Model<Task> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user: User;
}
