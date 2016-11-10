import React from 'react';
import { render } from 'react-dom';
import LoremIpsum from 'react-lorem-component';
import cx from 'classnames';
import './bundle.css';

const styles = cssInJs({
  red: {
    color: 'white',
    backgroundColor: 'red',
  },
});

const redClass = cx(styles.red);

function HelloWorld() {
  return (<h2 className={redClass}><LoremIpsum /></h2>);
}

const root = document.getElementById('root');

render(<HelloWorld />, root);
