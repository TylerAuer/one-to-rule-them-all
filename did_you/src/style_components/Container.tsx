import { css, SerializedStyles } from '@emotion/react';
import { space } from '../constants';

type ContainerProps = {
  children: React.ReactNode;
  sx?: SerializedStyles;
  width?: number;
};

const styles = css`
  max-width: 100%;
  margin: 0 auto;
  padding: ${space.padding.sm};
`;

export function Container({ children, sx, width = 1000 }: ContainerProps) {
  const widthCss = css`
    width: ${width}px;
  `;

  return <div css={[styles, widthCss, sx]}>{children}</div>;
}
