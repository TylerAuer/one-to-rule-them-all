import { css, Global } from '@emotion/react';

const styles = css`
  body {
    font-family: 'Roboto', sans-serif;
  }
`;

export const AppStyles = () => <Global styles={styles} />;
