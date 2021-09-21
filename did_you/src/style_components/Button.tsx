import { css, SerializedStyles } from '@emotion/react';
import { ReactNode } from 'react';
import { space, font, color } from '../constants';

type ButtonVariants = 'primary' | 'destroy' | 'quiet';
type ButtonSizes = 'small' | 'medium' | 'large';
type ButtonShapes = 'circle' | 'pill' | 'rectangle';

const btnCss = css`
  outline: none;
  color: white;
  cursor: pointer;
  font-family: Roboto, sans-serif;
`;

const btnSizes: { [key in ButtonSizes]: SerializedStyles } = {
  small: css`
    font-size: ${font.size.sm};
    padding: ${space.padding.sm} ${space.padding.md};
    border: 1px solid transparent;
  `,
  medium: css`
    font-size: ${font.size.md};
    padding: ${space.padding.md} ${space.padding.lg};
    letter-spacing: 0.5px;
    border: 2px solid transparent;
  `,
  large: css`
    font-size: ${font.size.lg};
    padding: ${space.padding.lg} ${space.padding.xl};
    font-weight: ${font.weight.bold};
    letter-spacing: 1px;
    border: 2px solid transparent;
  `,
};

const btnVariants: { [key in ButtonVariants]: SerializedStyles } = {
  primary: css`
    background-color: ${color.light.btn};

    :hover {
      background-color: ${color.light.btnHover};
    }
    :focus-visible {
      border-color: ${color.light.accent};
    }
  `,
  destroy: css``,
  quiet: css``,
};

const btnShapes: { [key in ButtonShapes]: SerializedStyles } = {
  circle: css`
    border-radius: 50%;
    height: 100px;
  `,
  pill: css`
    border-radius: 1000px;
  `,
  rectangle: css`
    border-radius: 8px;
  `,
};

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
  isDisabled?: Boolean;
  sx?: SerializedStyles;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  shape?: ButtonShapes;
};

export const Button = ({
  onClick,
  children,
  sx,
  variant = 'primary',
  size = 'medium',
  shape = 'rectangle',
}: ButtonProps) => {
  const variantCss = btnVariants[variant];
  const sizeCss = btnSizes[size];
  const shapeCss = btnShapes[shape];

  return (
    <button css={[btnCss, variantCss, sizeCss, shapeCss, sx]} onClick={onClick}>
      {children}
    </button>
  );
};
