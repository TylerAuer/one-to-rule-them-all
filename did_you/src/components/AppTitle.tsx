import { Fragment } from 'react';
import { css } from '@emotion/react';
import { Heading } from '../style_components/Heading';
import { Text } from '../style_components/Text';

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
      <Text sx={subtitleCss}>Friendly text reminders. So you don't have to be the pest.</Text>
    </Fragment>
  );
}
