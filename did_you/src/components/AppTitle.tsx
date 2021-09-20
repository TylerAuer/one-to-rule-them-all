import React from 'react';
import { css } from '@emotion/react';
import { Header } from '../style_components/Header';
import { font } from '../constants';

const titleCss = css`
  font-size: ${font.size.xl};
  text-align: center;
`;

const subtitleCss = css`
  font-size: ${font.size.md};
  text-align: center;
`;

export function AppTitle() {
  return (
    <>
      <Header css={titleCss} level={1}>
        Did you...
      </Header>
      <div css={subtitleCss}>Friendly text reminders, so you don't have to be a pest.</div>
    </>
  );
}
