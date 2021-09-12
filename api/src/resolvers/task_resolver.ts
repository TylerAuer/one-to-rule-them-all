import {
  Arg,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { Task } from '../entities/Task';
import { TaskMessage } from '../entities/TaskMessage';
import { ActionResultResponse, TaskState } from '../types';

@InputType()
class CreateTaskInput {
  @Field()
  title: string;
  @Field()
  due_date: Date;
  @Field({ nullable: true })
  desc?: string;
}

@ObjectType()
class CreateTaskResponse {
  @Field(() => Task, { nullable: true })
  task?: Task;
  @Field(() => String, { nullable: true })
  errorMessage?: string;
}

@InputType()
class DeleteTaskInput {
  @Field(() => String)
  id: string;
}

@InputType()
class UpdateTaskInput {
  @Field(() => String)
  id: string;
  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  desc?: string;
  @Field({ nullable: true })
  due_date?: Date;
  @Field({ nullable: true })
  state?: TaskState;
}

@ObjectType()
class UpdateTaskResponse {
  @Field(() => Task, { nullable: true })
  task?: Task;
  @Field(() => String, { nullable: true })
  errorMessage?: string;
}

@Resolver(Task)
export class TaskResolver {
  // @FieldResolver(() => Int)
  // async message_count(@Root() task: Task): Promise<number> {
  //   const { messages } = task;

  //   if (!messages) return 0;
  //   else return messages.length;
  // }

  @FieldResolver(() => [TaskMessage])
  async messages(@Root() task: Task): Promise<TaskMessage[]> {
    const messages = await TaskMessage.find({ where: { task: task.id } });
    return messages;
  }

  // Will need to use a me query to get tasks
  @Query(() => [Task], { nullable: true })
  async tasks(): Promise<Task[]> {
    return await Task.find();
  }

  @Mutation(() => Task, { nullable: true })
  async createTask(@Arg('input') input: CreateTaskInput): Promise<CreateTaskResponse> {
    const task = await Task.create({ ...input }).save();
    return task ? { task } : { errorMessage: 'Error: Unable to create task.' };
  }

  @Mutation(() => ActionResultResponse)
  async deleteTask(@Arg('input') input: DeleteTaskInput): Promise<ActionResultResponse> {
    const deleteResult = await Task.delete(input.id);

    return deleteResult.affected === 0
      ? {
          success: false,
          message: `Error: Task not found. Unable to delete task with ID: ${input.id}`,
        }
      : {
          success: true,
          message: `Successfully deleted task with ID: ${input.id}`,
        };
  }

  @Mutation(() => Task, { nullable: true })
  async updateTask(@Arg('input') input: UpdateTaskInput): Promise<UpdateTaskResponse> {
    // If only the ID is passed return an error
    if (Object.keys(input).length === 1)
      return {
        errorMessage: `Error: No fields to update.`,
      };

    const task = await Task.findOne(input.id);

    if (!task)
      return {
        errorMessage: `Error: Task not found. Unable to update task with ID: ${input.id}`,
      };

    // Update any fields that are passed
    input.title && (task.title = input.title);
    input.desc && (task.desc = input.desc);
    input.due_date && (task.due_date = input.due_date);
    input.state && (task.state = input.state);
    task.save();

    return { task };
  }
}
