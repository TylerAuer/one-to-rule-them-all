import { Connection } from 'typeorm';
import { User } from '../entities/User';
import { createTestConnection } from '../test_utils/create_test_connection';
import { testGQL } from '../test_utils/test_gql';

let conn: Connection;
beforeAll(async () => {
  conn = await createTestConnection(true);
});

afterAll(async () => {
  await conn.close();
});

const registerUserMutation = `
mutation registerUser($input: RegisterUserInput!) {
  registerUser (input: $input) {
    id
    name
    email
  }
}
`;

describe('UserResolver', () => {
  it('can register user', async () => {
    const contextValue = {
      req: {
        session: {
          userId: '',
        },
      },
    };

    await testGQL({
      source: registerUserMutation,
      gqlVars: {
        input: {
          name: 'name',
          email: 'email',
          password: 'password',
        },
      },
      contextValue,
    });

    console.log(contextValue.req.session.userId);
    await User.findOne(contextValue.req.session.userId);
  });
});
