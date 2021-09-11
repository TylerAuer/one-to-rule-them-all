import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { Task } from '../entity/Task';
import { ActionResultResponse, ErrorResponse, TaskState } from '../types';

@ObjectType()
class TaskResponse {
  @Field(() => [Task], { nullable: true })
  tasks?: Task[];

  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[];
}

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

@InputType()
class UpdateTaskInput {
  @Field()
  id: string;
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  due_date: Date;
  @Field({ nullable: true })
  desc: string;
  @Field({ nullable: true })
  state: TaskState;
}

@Resolver(Task)
export class TaskResolver {
  @Query(() => [TaskResponse], { nullable: true })
  async tasks(): Promise<TaskResponse> {
    const tasks = await Task.find();
    return { tasks };
  }

  @Mutation(() => TaskResponse)
  async createTask(@Arg('input') input: CreateTaskInput): Promise<TaskResponse> {
    const task = await Task.create({ ...input }).save();
    return { tasks: [task] };
  }

  @Mutation(() => ActionResultResponse)
  async deleteTask(@Arg('id') id: string): Promise<ActionResultResponse> {
    const deleteResult = await Task.delete(id);

    if (deleteResult.affected === 0) {
      return {
        success: false,
        message: 'Error: Task not found. Unable to delete task.',
      };
    }

    return {
      success: true,
      message: 'Task deleted successfully',
    };
  }

  @Mutation(() => TaskResponse)
  async updateTask(@Arg('input') input: UpdateTaskInput): Promise<TaskResponse> {
    if (!input.id)
      return {
        errors: [{ message: 'Error: You must provide an ID in order to update a task.' }],
      };

    const task = await Task.findOne(input.id);

    if (!task) {
      return {
        errors: [
          { message: 'Error: Unable to update task because task does not exist in database.' },
        ],
      };
    }

    const updateResult = await Task.update(Task, { ...input });

    if (updateResult.affected === 0) {
      return {
        errors: [{ message: 'Error: Unable to update task.' }],
      };
    }

    return {
      tasks: [task],
    };
  }
}
