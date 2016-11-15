import React, { PropTypes } from 'react';
import { style } from 'glamor';

const centerImage = style({
  display: 'block',
  margin: 'auto',
  paddingLeft: 8,
  paddingRight: 8,
});

export default function LoremPixel({ url = 'http://lorempixel.com', width = 200, height = 400, alt = 'Placeholder image' }) {
  const src = `${url}/${width}/${height}?t=${Date.now()}`;
  return (<img className={centerImage} src={src} alt={alt} />);
}

const { string, number, oneOf } = PropTypes;

LoremPixel.propTypes = {
  url: string,
  height: oneOf(string, number),
  width: oneOf(string, number),
  alt: string,
};
