import React from 'react';
import { render } from 'react-dom';
import LoremIpsum from 'react-lorem-component';
import cx from 'classnames';
import Helmet from 'react-helmet';

const styles = cssInJs({
  red: {
    color: 'white',
    backgroundColor: 'red',
  },
});

const redClass = cx(styles.red);
const cssLink = {
  rel: 'stylesheet',
  type: 'text/css',
  href: './bundle.css',
};

function HelloWorld() {
  return (<h2 className={redClass}>
    <Helmet link={[cssLink]} />
    <LoremIpsum />
  </h2>);
}

const root = document.getElementById('root');

render(<HelloWorld />, root);
