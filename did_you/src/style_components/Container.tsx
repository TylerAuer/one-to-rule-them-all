import { css } from '@emotion/react';

type ContainerProps = {
  children: React.ReactNode;
};

const styles = css`
  max-width: 100%;
  width: 1000px;
  margin: 0 auto;
`;

export function Container({ children }: ContainerProps) {
  return <div css={styles}>{children}</div>;
}
