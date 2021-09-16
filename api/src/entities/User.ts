import { ObjectType, Field } from 'type-graphql';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from './Task';
import { TaskMessage } from './TaskMessage';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => TaskMessage, (taskMessage) => taskMessage.sender)
  messages_as_sender: TaskMessage[];

  @OneToMany(() => TaskMessage, (taskMessage) => taskMessage.recipient)
  messages_as_recipient: TaskMessage[];

  @OneToMany(() => Task, (task) => task.creator)
  tasks_created: Task[];

  @OneToMany(() => Task, (task) => task.assignee)
  task_assigned: Task[];
}
