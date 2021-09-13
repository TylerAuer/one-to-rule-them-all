import { ObjectType, Field } from 'type-graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from './Task';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => Task, (task) => task.creator)
  tasks_created: Task[];

  @OneToMany(() => Task, (task) => task.assignee)
  task_assigned: Task[];
}
