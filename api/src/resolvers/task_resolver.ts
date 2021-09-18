import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Task } from '../entities/Task';
import { TaskMessage } from '../entities/TaskMessage';
import { User } from '../entities/User';
import { ActionResultResponse, CustomContextType, TaskState } from '../types';

@InputType()
class CreateTaskInput {
  @Field()
  title: string;
  @Field({ nullable: true })
  desc?: string;
  @Field()
  due_date: Date;
  @Field()
  assignee_id: string;
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
  @Field({ nullable: true })
  archived?: boolean;
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
  @FieldResolver(() => User)
  async assignee(@Root() task: Task): Promise<User> {
    // return User.findOneOrFail({ where: { tasks_assigned: task.assignee } });
    const assignee = await getConnection()
      .createQueryBuilder()
      .relation(Task, 'assignee')
      .of(task)
      .loadOne();
    if (!assignee) {
      throw new Error('Error: Unable to find assignee');
    }
    return assignee;
  }

  @FieldResolver(() => User)
  async creator(@Root() task: Task): Promise<User> {
    // return User.findOneOrFail({ where: { tasks_assigned: task.assignee } });
    const creator = await getConnection()
      .createQueryBuilder()
      .relation(Task, 'creator')
      .of(task)
      .loadOne();
    if (!creator) {
      throw new Error('Error: Unable to find creator');
    }
    return creator;
  }

  // @FieldResolver(() => User)
  // async creator(@Root() task: Task): Promise<User> {
  //   return await User.findOneOrFail(task.creator);
  // }

  @FieldResolver(() => [TaskMessage])
  async messages(@Root() task: Task): Promise<TaskMessage[]> {
    return await TaskMessage.find({ where: { task: task.id } });
  }

  @Query(() => [Task], { nullable: true })
  async tasks(@Ctx() { req }: CustomContextType): Promise<Task[]> {
    return await Task.find({ where: { archived: false, creator: req.session.userId } });
  }

  // Will need to use a me query to get tasks
  @Query(() => [Task], { nullable: true })
  async archivedTasks(): Promise<Task[]> {
    return await Task.find({ where: { archived: true } });
  }

  @Mutation(() => Task, { nullable: true })
  async createTask(
    @Arg('input') input: CreateTaskInput,
    @Ctx() { req }: CustomContextType
  ): Promise<Task> {
    const creatorId = req.session.userId;
    if (!creatorId) {
      throw new Error('Error: Must be logged in to create task');
    }
    const task = await Task.create({
      ...input,
      creator: await User.findOne(creatorId),
      assignee: await User.findOne(input.assignee_id),
    }).save();
    if (!task) {
      throw new Error(`Error: Unable to create task.`);
    }
    return task;
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
    input.archived && (task.archived = input.archived);
    task.save();

    return { task };
  }
}
