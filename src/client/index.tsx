import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, theme, injectGlobal } from './styling';
import store from './store';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

const GlobalStyle = injectGlobal`
  body {
    font-family: ${theme.fonts.body}, 'Helvetica Neue', sans-serif;
    font-weight: 300;
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }

  .material-icons {
    -webkit-font-smoothing: subpixel-antialiased;
    cursor: default;
  }

  .dragging {
    cursor: pointer;
    cursor: grabbing;
    user-select: none;
  }

  #draggable {
    position: absolute;
    pointer-events: none;
  }
`;

const renderRoot = (Component: any) => {
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component/>
      </ThemeProvider>
    </Provider>,
    document.getElementById('root')
  );
};

renderRoot(App);
registerServiceWorker();

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    renderRoot(require('./containers/App').default);
  });
}
