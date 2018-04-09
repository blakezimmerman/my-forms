import * as styledComponents from 'styled-components';

interface Theme {
  fonts: {
    heading: string;
    body: string;
  };
  colors: {
      primary: string;
      success: string;
      failure: string;
      disabled: string;
      disabledBG: string;
  };
}

const theme: Theme = {
  fonts: {
    heading: 'Prata',
    body: 'Lato'
  },
  colors: {
    primary: '#0046b7',
    success: '#4CAE4C',
    failure: '#CC0000',
    disabled: '#555',
    disabledBG: '#aaa'
  }
};

const maxWidthMedia = (maxWidth: string) =>
  (arg: TemplateStringsArray, ...args: styledComponents.SimpleInterpolation[]) => css`
    @media (max-width: ${maxWidth}) {
      ${css(arg, ...args)}
    }
  `;

const media = {
  mobile: maxWidthMedia('768px')
};

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider,
  withTheme
} = styledComponents as styledComponents.ThemedStyledComponentsModule<Theme>;

export { css, injectGlobal, keyframes, ThemeProvider, withTheme, Theme, theme, media };
export default styled;
