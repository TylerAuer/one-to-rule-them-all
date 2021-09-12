import { ObjectType, Field, registerEnumType } from 'type-graphql';

export enum TaskState {
  'ACTIVE',
  'COMPLETED',
  'PAST_DUE',
  'BLOCKED',
  'CANCELED_BY_CREATOR',
  'CANCELED_BY_ASSIGNEE',
}
registerEnumType(TaskState, {
  name: 'TaskState',
  description: 'Possible states that a task can be in',
});

@ObjectType()
export class ErrorResponse {
  @Field(() => String)
  message: string;
}

@ObjectType()
export class ActionResultResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  message?: string;
}
