import React, { PropTypes } from 'react';

export default function LoremPixel({ url = 'http://lorempixel.com', width = 200, height = 400, alt = 'Placeholder image' }) {
  const src = `${url}/${width}/${height}`;
  return (<img src={src} alt={alt} />);
}

const { string, number, oneOf } = Proptypes;

LoremPixel.propTypes = {
  url: string,
  height: oneOf(string, number),
  width: oneOf(string, number),
  alt: string,
};
