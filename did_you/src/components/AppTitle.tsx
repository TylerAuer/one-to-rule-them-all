import { Fragment } from 'react';
import { css } from '@emotion/react';
import { Heading } from '../style_components/Heading';
import { Words } from '../style_components/Words';

const titleCss = css`
  text-align: center;
`;

const subtitleCss = css`
  text-align: center;
`;

export function AppTitle() {
  return (
    <Fragment>
      <Heading sx={titleCss} level={1}>
        Did you...
      </Heading>
      <Words variant='subtitle' sx={subtitleCss}>
        Friendly text reminders. So you don't have to be the pest.
      </Words>
    </Fragment>
  );
}
