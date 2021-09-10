import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
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

@ObjectType()
class ActionResult {
  @Field()
  success: boolean;
  @Field()
  message: string;
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

  @Mutation(() => ActionResult)
  async deleteTask(@Arg('id') id: string): Promise<ActionResult> {
    const deleteResult = await Task.delete(id);

    if (deleteResult.affected === 0) {
      return {
        success: false,
        message: 'Task not found. Unable to delete task.',
      };
    }

    return {
      success: true,
      message: 'Task deleted successfully',
    };
  }
}
