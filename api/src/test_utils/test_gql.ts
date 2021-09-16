import { graphql } from 'graphql';
import { Maybe } from 'type-graphql';
import { createSchema } from '../utils/create_schema';

interface Options {
  source: string;
  variableValues?: Maybe<{ [key: string]: any }>;
}

export const testGQL = async ({ source, variableValues }: Options) => {
  return graphql({
    schema: await createSchema(),
    source,
    variableValues,
  });
};
