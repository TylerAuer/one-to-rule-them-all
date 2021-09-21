import { ReactNode } from 'react';
import { SerializedStyles } from '@emotion/utils';
import { css } from '@emotion/react';
import { color, font, space } from '../constants';

type WordsVariants = 'subtitle' | 'punch' | 'body';

const variantCss: { [key in WordsVariants]: SerializedStyles } = {
  subtitle: css`
    font-size: ${font.size.lg};
    color: ${color.light.textMuted};
  `,
  punch: css`
    font-size: ${font.size.md};
    color: ${color.light.textMuted};
    font-weight: ${font.weight.bold};
    font-style: italic;
    margin: 0 ${space.margin.xs};
  `,
  body: css`
    font-size: ${font.size.md};
    color: ${color.light.text};
    line-height: ${font.lineHeight};
  `,
};

type WordsAs = 'span' | 'p' | 'div';

type WordsProps = {
  children: ReactNode;
  sx?: SerializedStyles;
  as?: WordsAs;
  variant?: WordsVariants;
};

export function Words({ children, sx, as = 'p', variant = 'body' }: WordsProps) {
  const styles = [variantCss[variant], sx];

  switch (as) {
    case 'p':
      return <p css={[styles]}>{children}</p>;
    case 'span':
      return <span css={[styles]}>{children}</span>;
    case 'div':
      return <div css={[styles]}>{children}</div>;
  }
}
