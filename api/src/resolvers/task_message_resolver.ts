import { FieldResolver, Resolver, Root } from 'type-graphql';
import { TaskMessage } from '../entities/TaskMessage';
import { getTimeSince } from '../utils/date_utils';

@Resolver(TaskMessage)
export class TaskMessageResolver {
  @FieldResolver(() => String)
  sent_days_ago(@Root() taskMessage: TaskMessage): string {
    return getTimeSince(taskMessage.send_date);
  }
}
