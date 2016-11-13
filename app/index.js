import React from 'react';
import { render } from 'react-dom';
import { style, merge } from 'glamor';
import { container, row, col as colXs } from 'flexboxgrid.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SideMenu from './SideMenu';
import Bookshelf from './Bookshelf';

injectTapEventPlugin();

const containerStyle = style(container);
const rowStyle = style(row);
const colXs3Style = style(colXs(3));
const colXs9Style = style(colXs(9));

const books = [
  {
    title: 'Javascript: The Good Parts',
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

function HelloWorld() {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div className={containerStyle}>
        <div className={rowStyle}>
          <div className={colXs3Style}>
            <SideMenu />
          </div>
          <div className={colXs9Style}>
            <div className={rowStyle}>
              <Bookshelf books={books} />
            </div>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  );
}

const root = document.getElementById('root');

render(<HelloWorld />, root);

