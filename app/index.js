import React from 'react';
import { Router, hashHistory } from 'react-router';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'glamor/reset';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes';

injectTapEventPlugin();

const root = document.getElementById('root');
function renderRoutes(nextRoutes) {
  render(<AppContainer>
    <Router routes={nextRoutes} history={hashHistory} />
  </AppContainer>, root);
}

renderRoutes(routes);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const nextRoutes = require('./routes').default;
    renderRoutes(nextRoutes);
  });
}
