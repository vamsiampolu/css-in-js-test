import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './Main';
import Bookshelf from './Bookshelf';
import ResponsiveImages from './ResponsiveImages';

console.log(ResponsiveImages);
const routes = (
  <Route path="/" component={App}>
    <IndexRedirect to='/ruby' />
    <Route path="responsive" component={ResponsiveImages} />
    <Route path=":language" component={Bookshelf} />
  </Route>
);

export default routes;
