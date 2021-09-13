import { FieldResolver, Resolver, Root } from 'type-graphql';
import { Task } from '../entities/Task';
import { User } from '../entities/User';

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => [Task])
  async created_tasks(@Root() user: User): Promise<Task[]> {
    return await Task.find({ where: { creator: user.id } });
  }

  @FieldResolver(() => [Task])
  async assigned_tasks(@Root() user: User): Promise<Task[]> {
    return await Task.find({ where: { assignee: user.id } });
  }
}
