import React from 'react';
import { render } from 'react-dom';
import LoremIpsum from 'react-lorem-component';
import { style, merge } from 'glamor';
import { container, row, col as colXs } from 'flexboxgrid.js';
import SideMenu from './SideMenu';

debugger
console.log(colXs());
const scary = style({
  color: 'black',
  backgroundColor: 'beige',
});

const containerStyle = style(container);
const redClass = merge(scary, containerStyle);
const rowStyle = style(row);
const colXsStyle = style(colXs());

function HelloWorld() {
  return (<div className={redClass}>
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
  </div>);
}

const root = document.getElementById('root');

render(<HelloWorld />, root);


