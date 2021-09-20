import { css, SerializedStyles } from '@emotion/react';
import { ReactNode } from 'react';
import { space, text } from '../constants';

type ButtonVariants = 'primary' | 'destroy' | 'quiet';

const button = css`
  border-radius: 5px;
  border: none;
  outline: none;
  color: white;
  padding: ${space.padding.lg} ${space.padding.xl};
  font-size: ${text.size.md};
  font-weight: ${text.weight.bold};
  cursor: pointer;
`;

const btnVariants = {
  primary: css`
    ${button};
    background-color: #86befe;

    :hover {
      background-color: #6b9ef5;
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
