import React from 'react';
import { Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes';

injectTapEventPlugin();


const books = [
  {
    /* eslint-disable no-script-url*/
    title: 'Javascript: The Good Parts',
    /* eslint-enable no-script-url*/
    author: 'Douglas Crockford',
  },
  {
    title: 'Eloquent JavaScript',
    author: 'Marijhn Haeverbacke',
  },
  {
    title: 'JavaScript Allonge',
    author: 'Reginald Braithwaite',
  },
  {
    title: 'Programming JavaScript Applications',
    author: 'Eric Elliot',
  },
  {
    title: 'SurviveJS',
    author: 'Juho Vesplainen',
  },
];


const root = document.getElementById('root');
render(<Router routes={routes} history={browserHistory} />, root);

