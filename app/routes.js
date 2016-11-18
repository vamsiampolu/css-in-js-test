import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './Main';
import Bookshelf from './Bookshelf';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Bookshelf} />
    <Route path="/:language" component={Bookshelf} />
  </Route>
);

export default routes;
