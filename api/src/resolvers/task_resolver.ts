import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { Task } from '../entity/Task';

@InputType()
class TaskInput {
  @Field()
  title: string;
  @Field()
  desc?: string;
  @Field()
  due_date: Date;
}

@Resolver(Task)
export class TaskResolver {
  @Query(() => [Task], { nullable: true })
  tasks(): Promise<Task[]> {
    return Task.find();
  }

  @Mutation(() => Task)
  createTask(@Arg('input') input: TaskInput): Promise<Task> {
    return Task.create({ ...input }).save();
  }
}
