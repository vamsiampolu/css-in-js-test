import React from 'react';
import { render } from 'react-dom';
import LoremIpsum from 'react-lorem-component';
import { style, merge } from 'glamor';
import { container, row, col as colXs } from 'flexboxgrid.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import SideMenu from './SideMenu';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const containerStyle = style(container);
const redClass = merge(containerStyle);
const rowStyle = style(row);
const colXsStyle = style(colXs());
const colXs3Style = style(colXs(3));
const colXs9Style = style(colXs(9));

function HelloWorld() {
  return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className={redClass}>
          <div className={rowStyle}>
            <div className={colXs3Style}>
              <SideMenu />
            </div>
            <div className={colXs9Style}>
              <div className={rowStyle}>
                <div className={colXsStyle}>
                  <LoremIpsum />
                </div>
                <div className={colXsStyle}>
                  <LoremIpsum />
                </div>
                <div className={colXsStyle}>
                  <LoremIpsum />
                </div>
              </div>
            </div>
          </div>
        </div>
    </MuiThemeProvider>
  );
}

const root = document.getElementById('root');

render(<HelloWorld />, root);

