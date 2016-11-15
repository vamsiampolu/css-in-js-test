import React from 'react';
import { style } from 'glamor';
import { containerFluid as container, row, col as colXs } from 'flexboxgrid.js';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import SideMenu from './SideMenu';

const containerStyle = style(container);
const rowStyle = style(row);
const colXs3Style = style(colXs(3));
const colXs9Style = style(colXs(9));

export default function Main({ children }) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div className={containerStyle}>
        <div className={rowStyle}>
          <div className={colXs3Style}>
            <SideMenu />
          </div>
          <div className={colXs9Style}>
            <div className={rowStyle}>
              <AppBar
                showMenuIconButton={false}
                title="Bookcover Mashup"
              />
            </div>
            <div className={rowStyle}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  );
}
