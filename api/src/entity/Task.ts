import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TaskState } from '../types';

@ObjectType()
@Entity()
export class Task extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ nullable: false })
  title: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  desc: string;

  @Field(() => TaskState)
  @Column({
    type: 'enum',
    enum: TaskState,
    default: TaskState.ACTIVE,
    nullable: false,
  })
  state: TaskState;

  @Field()
  @Column({ nullable: false })
  due_date: Date;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
