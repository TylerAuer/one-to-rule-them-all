import { Fragment } from 'react';
import { AppTitle } from './components/AppTitle';
import { AppStyles } from './style_components/AppStyles';
import { Container } from './style_components/Container';
import { HeaderBar } from './components/HeaderBar';

export function App() {
  return (
    <Fragment>
      <AppStyles />
      <HeaderBar />
      <Container>
        <AppTitle />
      </Container>
    </Fragment>
  );
}
