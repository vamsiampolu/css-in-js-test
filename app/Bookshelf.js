import React, { PropTypes } from 'react';
import { style, nthChild, merge } from 'glamor';
import uuid from 'node-uuid';
import { col, row } from 'flexboxgrid.js';
import Book from './Book';

const { string, arrayOf, shape } = PropTypes;

const colAuto = style(col());
const dontExpand = style({
  flexGrow: 0,
  flexShrink: 0,
});

const headRoom = style({
  marginTop: '2em',
});

const firstChild = nthChild(1, { marginTop: 0 });
const secondChild = nthChild(2, { marginTop: 0 });


const colFixedWidth = merge(colAuto, dontExpand, headRoom);
const rowStyle = style(row);

export default function Bookshelf({ books }) {
  let Books;
  if (books != null && books.length > 0) {
    Books = books.map(book => (<div
      key={uuid.v4()}
      className={colFixedWidth}
      {...firstChild}
      {...secondChild}
    >
      <Book {...book} />
    </div>),
    );
  }

  return (
    <div className={rowStyle}>
      {Books}
    </div>
  );
}

Bookshelf.propTypes = {
  books: arrayOf(shape({
    title: string,
    author: string,
    cover: string,
  })),
};
