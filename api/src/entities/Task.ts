import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TaskState } from '../types';
import { TaskMessage } from './TaskMessage';

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
    default: TaskState.ACTIVE,
  })
  state: TaskState;

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
}
