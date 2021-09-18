import { graphql, Source } from 'graphql';
import { Maybe } from 'type-graphql';
import { createSchema } from '../utils/create_schema';

interface Options {
  source: string | Source;
  gqlVars?: Maybe<{ [key: string]: any }>;
  contextValue?: any;
}

export const testGQL = async ({ source, gqlVars, contextValue }: Options) => {
  return graphql({
    schema: await createSchema(),
    source,
    variableValues: gqlVars,
    contextValue,
  });
};
