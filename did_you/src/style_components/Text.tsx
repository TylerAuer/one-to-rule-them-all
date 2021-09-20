import { ReactNode } from 'react';
import { SerializedStyles } from '@emotion/utils';
import { css } from '@emotion/react';
import { font } from '../constants';

const variantCss = {
  subtitle: css`
    ${font.size.md};
  `,
};

type TextProps = {
  children: ReactNode;
  sx?: SerializedStyles;
  variant?: 'subtitle';
};

export function Text({ children, sx, variant = 'subtitle' }: TextProps) {
  return <div css={[variantCss[variant], sx]}>{children}</div>;
}
