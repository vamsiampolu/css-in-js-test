import React, { PropTypes } from 'react';
import loremIpsum from 'lorem-ipsum';
import EllipsisText from './EllipsisText';

export default function LoremIpsum({ sentences = 6, paragraphs = 2, maxVisibleChar = 200 }) {
  const text = loremIpsum({
    count: paragraphs,
    unit: 'paragraphs',
    paragraphLowerBound: 3,
    paragraphUpperBound: sentences,
  });
  return (<EllipsisText text={text} limit={maxVisibleChar} />);
}

const { number } = PropTypes;

LoremIpsum.propTypes = {
  sentences: number,
  paragraphs: number,
  maxVisibleChar: number,
};
