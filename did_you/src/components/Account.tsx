import { css } from '@emotion/react';
import { Fragment, useState } from 'react';
import { Button } from '../style_components/Button';
import { Container } from '../style_components/Container';
import { Divider } from '../style_components/Divider';
import { Heading } from '../style_components/Heading';
import { Words } from '../style_components/Words';

const fullWidth = css`
  display: block;
  width: 100%;
  text-align: center;
`;

type AccountStates = 'logged out' | 'account' | 'register' | 'log in';

export const Account = () => {
  const [accountState, setAccountState] = useState<AccountStates>('logged out');

  switch (accountState) {
    case 'account':
      return <AccountInfo setAccountState={setAccountState} />;
    case 'register':
      return <Register setAccountState={setAccountState} />;
    case 'log in':
      return <LogIn setAccountState={setAccountState} />;
    case 'logged out':
      return <LoggedOut setAccountState={setAccountState} />;
  }
};

type AccountSubComponentProps = {
  setAccountState: (state: AccountStates) => void;
};

const Register = ({ setAccountState }: AccountSubComponentProps) => {
  return (
    <Container width={400}>
      <Heading level={2}>Register</Heading>
      <Button onClick={() => setAccountState('register')} size='large' sx={fullWidth}>
        Register
      </Button>
      <Button onClick={() => setAccountState('logged out')} size='large' sx={fullWidth}>
        Back
      </Button>
    </Container>
  );
};

const LogIn = ({ setAccountState }: AccountSubComponentProps) => {
  return (
    <Container width={400}>
      <Heading level={2}>Log In</Heading>
      <Button onClick={() => setAccountState('log in')} size='large' sx={fullWidth}>
        Log In
      </Button>
      <Button onClick={() => setAccountState('logged out')} size='large' sx={fullWidth}>
        Back
      </Button>
    </Container>
  );
};

const AccountInfo = ({ setAccountState }: AccountSubComponentProps) => {
  return (
    <Container width={400}>
      <Heading level={2}>Account Info</Heading>
      <Button onClick={() => setAccountState('logged out')} size='large' sx={fullWidth}>
        Back
      </Button>
    </Container>
  );
};

const LoggedOut = ({ setAccountState }: AccountSubComponentProps) => {
  return (
    <Container width={400}>
      <Button onClick={() => setAccountState('log in')} size='large' sx={fullWidth}>
        Log In
      </Button>
      <Divider spacing='medium'>Or</Divider>
      <Button onClick={() => setAccountState('register')} size='large' sx={fullWidth}>
        Register
      </Button>
      <Words>
        You'll need to sign in or register to use{' '}
        <Words as='span' variant='punch'>
          Did you...?
        </Words>{' '}
        You can use this same account for any of Tyler Auer's apps.
      </Words>
    </Container>
  );
};
