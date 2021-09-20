import { SerializedStyles } from '@emotion/utils';
import React, { ReactNode } from 'react';

type HeaderProps = {
  children: React.ReactNode;
  css?: SerializedStyles;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};

export function Header({ children, level = 1, css }: HeaderProps) {
  switch (level) {
    case 1:
    default:
      return <H1 css={css}>{children}</H1>;
    case 2:
      return <H2 css={css}>{children}</H2>;
    case 3:
      return <H3 css={css}>{children}</H3>;
    case 4:
      return <H4 css={css}>{children}</H4>;
    case 5:
      return <H5 css={css}>{children}</H5>;
    case 6:
      return <H6 css={css}>{children}</H6>;
  }
}

type HLevelProps = {
  children: ReactNode;
  css?: SerializedStyles;
};

function H1({ children, css }: HLevelProps) {
  return <h1 css={css}>{children}</h1>;
}

function H2({ children, css }: HLevelProps) {
  return <h2 css={css}>{children}</h2>;
}

function H3({ children, css }: HLevelProps) {
  return <h3 css={css}>{children}</h3>;
}

function H4({ children, css }: HLevelProps) {
  return <h4 css={css}>{children}</h4>;
}

function H5({ children, css }: HLevelProps) {
  return <h5 css={css}>{children}</h5>;
}

function H6({ children, css }: HLevelProps) {
  return <h6 css={css}>{children}</h6>;
}
