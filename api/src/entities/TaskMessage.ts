import { ObjectType, Field, Int } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { TaskMessageKind } from '../types';
import { Task } from './Task';

/**
 * A log for the text messages that have been sent as reminders or received in response.
 */
@ObjectType()
@Entity()
export class TaskMessage extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  message: string;

  @Field()
  @Column()
  sender_number: string;

  @Field()
  @Column()
  recipient_number: string;

  @Field(() => TaskMessageKind)
  @Column({
    type: 'enum',
    enum: TaskMessageKind,
  })
  kind: TaskMessageKind;

  @Field()
  @Column()
  sent_date: Date;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Task, (task) => task.messages)
  task: Task;

  @Field(() => String)
  sent_days_ago: string;
}
