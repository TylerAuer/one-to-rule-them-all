import { css, SerializedStyles } from '@emotion/react';
import { color, font, space } from '../constants';

type SpacingType = 'small' | 'medium' | 'large';

const spacingMap: { [key in SpacingType]: SerializedStyles } = {
  small: css`
    margin: ${space.margin.lg} 0;
  `,
  medium: css`
    margin: ${space.margin.xl} 0;
  `,
  large: css`
    margin: ${space.margin.xxl} 0;
  `,
};

const dividerCss = css`
  display: flex;
  align-items: center;
  text-align: center;
  color: ${color.light.textPunch};
  font-size: ${font.size.md};
  font-style: italic;
  font-weight: ${font.weight.bold};
  margin: ${space.margin.xxl} 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 2px solid ${color.light.textPunch};
  }
  &::before {
    margin-right: ${space.margin.xl};
  }

  &::after {
    margin-left: ${space.margin.xl};
  }
`;

type DividerProps = {
  children: string;
  spacing?: SpacingType;
  sx?: SerializedStyles;
};

export const Divider = ({ children, spacing = 'medium', sx }: DividerProps) => {
  const style = [dividerCss, spacingMap[spacing], sx];

  return <div css={style}>{children}</div>;
};
