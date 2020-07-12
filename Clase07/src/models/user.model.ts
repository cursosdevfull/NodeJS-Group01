import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Task } from './task.model';

@Table
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.TEXT })
  email!: string;

  @Column({ type: DataType.TEXT })
  password!: string;

  @HasMany(() => Task)
  tasks: Task[];
}
