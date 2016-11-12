import React from 'react';
import { render } from 'react-dom';
import LoremIpsum from 'react-lorem-component';
import { style, merge } from 'glamor';
import { container } from 'flexboxgrid.js';

debugger
const scary = style({
  color: 'white',
  backgroundColor: 'red',
});

const containerStyle = style(container);
const redClass = merge(scary, containerStyle);

function HelloWorld() {
  return (<div className={redClass}>
    <LoremIpsum />
  </div>);
}

const root = document.getElementById('root');

render(<HelloWorld />, root);
