import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Task } from '../entity/Task';
import { ActionResultResponse, ErrorResponse, TaskState } from '../types';

@InputType()
class CreateTaskInput {
  @Field()
  title: string;
  @Field()
  due_date: Date;
  @Field({ nullable: true })
  desc: string;
  @Field({ nullable: true })
  state: TaskState;
}

@Resolver(Task)
export class TaskResolver {
  @Query(() => [Task], { nullable: true })
  async tasks(): Promise<Task[]> {
    return await Task.find();
  }

  @Mutation(() => Task, { nullable: true })
  async createTask(@Arg('input') input: CreateTaskInput): Promise<Task | undefined> {
    return await Task.create({ ...input }).save();
  }

  @Mutation(() => ActionResultResponse)
  async deleteTask(@Arg('id') id: string): Promise<ActionResultResponse> {
    const deleteResult = await Task.delete(id);

    return deleteResult.affected === 0
      ? {
          success: false,
          message: 'Error: Task not found. Unable to delete task.',
        }
      : {
          success: true,
          message: 'Task deleted successfully',
        };
  }

  @Mutation(() => Task, { nullable: true })
  async updateTask(
    @Arg('id') id: string,
    @Arg('title') title: string,
    @Arg('desc') desc: string,
    @Arg('due_date', () => Date) due_date: Date,
    @Arg('state', () => TaskState) state: TaskState
  ): Promise<Task | undefined> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Task)
      .set({ title, desc, due_date, state })
      .where('id = :id', { id: id })
      .execute();

    return result.raw[0];
  }
}
