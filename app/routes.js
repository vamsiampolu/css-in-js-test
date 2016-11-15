import React from 'react';
import { Route } from 'react-router';
import App from './Main';
import Bookshelf from './Bookshelf';

const routes = (
  <Route path="/" component={App}>
    <Route path="/:language" component={Bookshelf} />
  </Route>
);

export default routes;
