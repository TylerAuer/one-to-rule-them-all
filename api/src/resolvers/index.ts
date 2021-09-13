import { NonEmptyArray } from 'type-graphql';
import { User } from '../entities/User';
import { TaskMessageResolver } from './task_message_resolver';
import { TaskResolver } from './task_resolver';

export const resolvers: NonEmptyArray<Function> = [User, TaskResolver, TaskMessageResolver];
