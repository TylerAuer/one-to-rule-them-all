import { css, SerializedStyles } from '@emotion/react';
import { ReactNode } from 'react';
import { space, font, color } from '../constants';

type ButtonVariants = 'primary' | 'destroy' | 'quiet';

const button = css`
  border-radius: 5px;
  border: none;
  outline: none;
  color: white;
  padding: ${space.padding.lg} ${space.padding.xl};
  font-size: ${font.size.md};
  font-weight: ${font.weight.bold};
  cursor: pointer;
  font-family: Roboto, sans-serif;
  letter-spacing: 0.5px;
`;

const btnVariants = {
  primary: css`
    ${button};
    background-color: ${color.light.btn};

    :hover {
      background-color: ${color.light.btnHover};
    }
  `,
  destroy: css``,
  quiet: css``,
};

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
  variant?: ButtonVariants;
  isDisabled?: Boolean;
  sx?: SerializedStyles;
  size?: 'small' | 'medium' | 'large';
};

export const Button = ({
  onClick,
  children,
  sx,
  variant = 'primary',
  size = 'medium',
}: ButtonProps) => {
  return (
    <button css={[btnVariants[variant], sx]} onClick={onClick}>
      {children}
    </button>
  );
};
