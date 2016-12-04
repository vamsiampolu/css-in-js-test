import React, { PropTypes } from 'react';
import { style } from 'glamor';
import Image from './Image';

const centerImage = style({
  display: 'block',
  margin: 'auto',
  paddingLeft: 8,
  paddingRight: 8,
});

export default function LoremPixel({ url = 'http://lorempixel.com', width = 200, height = 400, alt = 'Placeholder image' }) {
  const src = `${url}/${width}/${height}?t=${Date.now()}`;
  return (<Image
    rounded={false}
    width={width}
    height={height}
    alt={alt}
    className={centerImage}
    src={src}
  />);
}

const { string, number, oneOf } = PropTypes;

LoremPixel.propTypes = {
  url: string,
  height: oneOf(string, number),
  width: oneOf(string, number),
  alt: string,
};
