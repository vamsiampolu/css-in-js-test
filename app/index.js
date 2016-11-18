import React from 'react';
import { Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes';

injectTapEventPlugin();

const root = document.getElementById('root');
render(<Router routes={routes} history={browserHistory} />, root);

