import { FieldResolver, Resolver, Root } from 'type-graphql';
import { TaskMessage } from '../entities/TaskMessage';

@Resolver(TaskMessage)
export class TaskMessageResolver {
  @FieldResolver(() => String)
  sent_days_ago(@Root() taskMessage: TaskMessage): string {
    const dateSent = taskMessage.send_date;
    const now = new Date();
    const diff = now.getUTCDay() - dateSent.getUTCDay();

    const relTimeFormatter = new Intl.RelativeTimeFormat('en', {
      localeMatcher: 'best fit',
      numeric: 'auto',
      style: 'long',
    });

    return relTimeFormatter.format(diff, 'day');
  }
}
