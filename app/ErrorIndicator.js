import React, { PropTypes } from 'react';
import { style } from 'glamor';

export default function ErrorIndicator() {
  const crossArm = {
    background: '#000',
    width: 5,
    height: 50,
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'rotate(45deg)',
  };

  const otherCrossArm = style({
    ...crossArm,
    transform: 'rotate(-45deg)',
  });

  return (<div>
      <div {...style(crossArm)} />
      <div {...otherCrossArm} />
      </div>);
}
