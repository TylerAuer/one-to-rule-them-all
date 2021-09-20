import { css, Global } from '@emotion/react';
import { color, font } from '../constants';

const styles = css`
  body {
    font-family: ${font.family.primary};
    background: ${color.light.bgMuted};
  }
`;

export const AppStyles = () => <Global styles={styles} />;
