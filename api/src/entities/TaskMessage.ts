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
import { TaskMessageKind, TaskMessageStatus } from '../types';
import { Task } from './Task';
import { User } from './User';

/**
 * A log for the text messages that have been sent as reminders or received in response.
 */
@ObjectType()
@Entity()
export class TaskMessage extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  message: string;

  @Field()
  @Column()
  sender_number: string;

  @ManyToOne(() => User, (user) => user.messages_as_sender)
  sender: User;

  @Field()
  @Column()
  recipient_number: string;

  @ManyToOne(() => User, (user) => user.messages_as_recipient)
  recipient: User;

  @Field(() => TaskMessageKind)
  @Column({
    type: 'enum',
    enum: TaskMessageKind,
  })
  kind: TaskMessageKind;

  @Field(() => TaskMessageStatus)
  @Column({
    type: 'enum',
    enum: TaskMessageStatus,
  })
  status: TaskMessageStatus;

  @Field()
  @Column()
  send_date: Date;

  @ManyToOne(() => Task, (task) => task.messages)
  task: Task;

  @Field(() => String)
  sent_days_ago: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
