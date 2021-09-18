import { NonEmptyArray } from 'type-graphql';
import { TaskMessageResolver } from './task_message_resolver';
import { TaskResolver } from './task_resolver';
import { UserResolver } from './user_resolver';

export const resolvers: NonEmptyArray<Function> = [UserResolver, TaskResolver, TaskMessageResolver];
