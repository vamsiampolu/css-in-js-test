import React from 'react';
import { style } from 'glamor';
import { container } from 'flexboxgrid.js';
import Image from './Image';

export default function ResponsiveImages() {
  const srcSet = {
    '1x': 'https://webkit.org/demos/srcset/image-src.png',
    '2x': 'https://webkit.org/demos/srcset/image-2x.png',
    '3x': 'https://webkit.org/demos/srcset/image-3x.png',
    '4x': 'https://webkit.org/demos/srcset/image-4x.png',
  };

  const containerStyle = style(container);

  return (<div {...containerStyle}>
    <Image
      width={800}
      height={800}
      src="https://webkit.org/demos/srcset/image-src.png"
      srcset={srcSet}
    />
  </div>);
}
