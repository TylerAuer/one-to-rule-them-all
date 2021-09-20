import { css } from '@emotion/react';
import { space, font } from '../constants';
import { Button } from '../style_components/Button';
import { Text } from '../style_components/Text';

const containerCss = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: ${space.margin.lg};
  align-items: center;
`;

const left = css`
  text-align: center;
  justify-self: start;
`;

const center = css`
  text-align: center;
  justify-self: center;
  font-size: ${font.size.lg};
  font-style: italic;
  font-weight: ${font.weight.bold};
`;

const right = css`
  text-align: center;
  justify-self: end;
`;

export function HeaderBar() {
  return (
    <div css={containerCss}>
      <div css={left} />
      <Text sx={center}>Did you...?</Text>
      <div css={right}>
        <Button onClick={() => {}}>Sign in</Button>
      </div>
    </div>
  );
}
