import { ObjectType, Field, registerEnumType } from 'type-graphql';

export enum TaskState {
  'INCOMPLETE',
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

export enum TaskMessageKind {
  'REMINDER_FROM_APP',
  'RESPONSE_FROM_ASSIGNEE',
}
registerEnumType(TaskMessageKind, {
  name: 'TaskMessageKind',
  description: 'Kind of message',
});

export enum TaskMessageStatus {
  'SENT',
  'RECEIVED',
  'SCHEDULED',
  'CANCELED',
}
registerEnumType(TaskMessageStatus, {
  name: 'TaskMessageStatus',
  description: 'Possible states for a task message',
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
