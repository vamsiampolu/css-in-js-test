import React, { PropTypes } from 'react';
import { keyframes, style } from 'glamor';

export default function LoadingIndicator() {
  const ring = keyframes({
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  });

  const loadingStyle = style({
    position: 'absolute',
    display: 'block',
    width: 40,
    height: 40,
    top: '37%',
    left: '37%',
    borderRadius: 80,
    boxShadow: '0 3px 0 0 #59ebff',
    animation: `${ring} 1s linear infinite`,
  });

  return (<div {...loadingStyle} />);
}


