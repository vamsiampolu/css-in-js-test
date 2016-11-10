import React from 'react';
import { render } from 'react-dom';
import LoremIpsum from 'react-lorem-component';

function HelloWorld() {
  return (<h2><LoremIpsum /></h2>);
}

const root = document.getElementById('root');

render(<HelloWorld />, root);
