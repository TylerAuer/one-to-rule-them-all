import { FieldResolver, Resolver, Root } from 'type-graphql';
import { TaskMessage } from '../entities/TaskMessage';

@Resolver(TaskMessage)
export class TaskMessageResolver {
  @FieldResolver(() => String)
  time_sent_relative(@Root() taskMessage: TaskMessage): string {
    const dateSent = taskMessage.sent_date;
    const now = new Date();
    const diff = dateSent.getTime() - now.getTime();

    const relTimeFormatter = new Intl.RelativeTimeFormat('en', {
      localeMatcher: 'best fit',
      numeric: 'auto',
      style: 'long',
    });

    return relTimeFormatter.format(diff, 'day');
  }
}
