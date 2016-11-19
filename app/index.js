import React from 'react';
import { Router, browserHistory, createMemoryHistory } from 'react-router';
import { render } from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes';

injectTapEventPlugin();

if(typeof document !== 'undefined') {
  const root = document.getElementById('root');
  render(<Router routes={routes} history={browserHistory} />, root);
}


export default function staticRenderer(locals, callback) {
  const history = createMemoryHistory();
  const { assets } = locals
  const location = history.location(locals.path);
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    const html = ReactDOMServer.renderToString(<RoutingContext {...renderProps} />);
    const renderedTemplate = template({html, assets});
    callback(null, renderedTemplate);
  });
}

