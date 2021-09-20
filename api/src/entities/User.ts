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
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ nullable: true })
  phone_number?: string;

  @Field(() => [Task])
  @OneToMany(() => Task, (task) => task.creator)
  tasks_created: Task[];

  @Field(() => [Task])
  @OneToMany(() => Task, (task) => task.assignee)
  tasks_assigned: Task[];
}
