import React from 'react';
import { Router, browserHistory, createMemoryHistory, match, RoutingContext } from 'react-router';
import { render } from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes';

if (window && window.document != null) {
  injectTapEventPlugin();
  const root = document.getElementById('root');
  render(<Router routes={routes} history={browserHistory} />, root);
}

const template = require('./template.ejs');
export default function staticRenderer(locals, callback) {
  const history = createMemoryHistory();
  const { assets } = locals;
  const location = history.location(locals.path);
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    const html = ReactDOMServer.renderToString(<RoutingContext {...renderProps} />);
    const renderedTemplate = template({ html, assets });
    callback(null, renderedTemplate);
  });
}

