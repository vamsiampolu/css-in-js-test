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


const colFixedWidth = merge(colAuto, dontExpand, headRoom);
const rowStyle = style(row);

const booksByLanguage = {
  javascript: [
{
  /* eslint-disable no-script-url*/
  title: 'Javascript: The Good Parts',
  /* eslint-enable no-script-url*/
  author: 'Douglas Crockford',
},
{
  title: 'Eloquent JavaScript',
  author: 'Marijhn Haeverbacke',
},
{
  title: 'JavaScript Allonge',
  author: 'Reginald Braithwaite',
},
{
  title: 'Programming JavaScript Applications',
  author: 'Eric Elliot',
},
{
  title: 'SurviveJS',
  author: 'Juho Vesplainen',
},
  ]};



export default function Bookshelf({ params }) {
  const { language } = params;
  let Books;
  const books = booksByLanguage[language];
  if (books != null && books.length > 0) {
    Books = books.map(book => (<div
      key={uuid.v4()}
      className={colFixedWidth}
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
