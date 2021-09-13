import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TaskState } from '../types';
import { TaskMessage } from './TaskMessage';
import { User } from './User';

/**
 * Task entity
 */
@ObjectType()
@Entity()
export class Task extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  desc?: string;

  @Field(() => TaskState)
  @Column({
    type: 'enum',
    enum: TaskState,
    default: TaskState.INCOMPLETE,
  })
  state: TaskState;

  @Field()
  @Column({ default: false })
  archived: boolean;

  @Field()
  @Column()
  due_date: Date;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => TaskMessage, (taskMessage) => taskMessage.task)
  messages: TaskMessage[];

  @ManyToOne(() => User, (user) => user.tasks_created)
  creator: User;

  @ManyToOne(() => User, (user) => user.task_assigned)
  assignee: User;
}
