import { SerializedStyles } from '@emotion/utils';
import { css } from '@emotion/react';
import { font } from '../constants';

const cssMap = {
  1: css`
    font-size: ${font.size.xxl};
  `,
  2: css`
    font-size: ${font.size.xl};
  `,
  3: css`
    font-size: ${font.size.lg};
  `,
  4: css`
    font-size: ${font.size.md};
  `,
  5: css`
    font-size: ${font.size.sm};
  `,
  6: css`
    font-size: ${font.size.xs};
  `,
};

type HeaderProps = {
  children: React.ReactNode;
  sx?: SerializedStyles;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};

export function Heading({ children, level = 2, sx }: HeaderProps) {
  const style = [cssMap[level], sx];

  switch (level) {
    case 1:
    default:
      return <h1 css={style}>{children}</h1>;
    case 2:
      return <h2 css={style}>{children}</h2>;
    case 3:
      return <h3 css={style}>{children}</h3>;
    case 4:
      return <h4 css={style}>{children}</h4>;
    case 5:
      return <h5 css={style}>{children}</h5>;
    case 6:
      return <h6 css={style}>{children}</h6>;
  }
}
