import React, { PropTypes } from 'react';
import EllipsisText from 'react-ellipsis-text';
import loremIpsum from 'lorem-ipsum';

export default function LoremIpsum({ sentences = 6, paragraphs = 2, maxVisibleChar = 300, more = '...' }) {
  const text = loremIpsum({
    count: paragraphs,
    unit: 'paragraphs',
    paragraphLowerBound: 3,
    paragraphUpperBound: sentences,
    tail: more,
  });
  return (<EllipsisText text={text} length={maxVisibleChar} />);
}

const { number, string } = PropTypes;

LoremIpsum.propTypes = {
  sentences: number,
  paragraphs: number,
  more: string,
  maxVisibleChar: number,
};
