import React, { ReactNode } from 'react';

type HeaderProps = {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};

export function Header({ children, level = 1 }: HeaderProps) {
  switch (level) {
    case 1:
    default:
      return <H1>{children}</H1>;
    case 2:
      return <H2>{children}</H2>;
    case 3:
      return <H3>{children}</H3>;
    case 4:
      return <H4>{children}</H4>;
    case 5:
      return <H5>{children}</H5>;
    case 6:
      return <H6>{children}</H6>;
  }
}

type HLevelProps = {
  children: ReactNode;
};

function H1({ children }: HLevelProps) {
  return <h1>{children}</h1>;
}

function H2({ children }: HLevelProps) {
  return <h2>{children}</h2>;
}

function H3({ children }: HLevelProps) {
  return <h3>{children}</h3>;
}

function H4({ children }: HLevelProps) {
  return <h4>{children}</h4>;
}

function H5({ children }: HLevelProps) {
  return <h5>{children}</h5>;
}

function H6({ children }: HLevelProps) {
  return <h6>{children}</h6>;
}
