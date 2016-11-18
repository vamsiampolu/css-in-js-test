import React, { PropTypes } from 'react';
import { style, merge } from 'glamor';
import uuid from 'node-uuid';
import { col, row } from 'flexboxgrid.js';
import Book from './Book';

const { object } = PropTypes;

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
  ruby: [
    {
      title: "Why's Poignant Guide to Ruby",
      author: '_why',
    },
    {
      title: 'Learn Ruby the hard way',
      author: 'Zed Shaw',
    },
    {
      title: 'The Bastards Book of Ruby',
      author: 'Dan Nguyen',
    },
    {
      title: 'Learn to Program',
      author: 'Chris Pine',
    },
    {
      title: 'Just Enough Ruby to Get By',
      author: 'Jason Kim',
    },
    {
      title: 'I Love Ruby',
      author: 'Karthikeyan AK',
    },
  ],
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
      title: 'Javascript Design Patterns',
      author: 'Addy Osmani',
    },
    {
      title: 'Programming JavaScript Applications',
      author: 'Eric Elliot',
    },
    {
      title: 'SurviveJS',
      author: 'Juho Vesplainen',
    },
    {
      title: "You Don't Know JS",
      author: 'Kyle Simpson',
    },
    {
      title: "Dr Frisby's Mostly Adequate Guide to Functional Programming",
      author: 'Brian Lonsdorf',
    },
    {
      title: 'Understanding Ecmascript 6',
      author: 'Nicholas C. Zakas',
    },
    {
      title: 'Node: Up and Running',
      author: 'Tom Hughes-Croucher',
    },
  ],
  python: [
    {
      title: 'Learn Python the Hard Way',
      author: 'Zed Shaw',
    },
    {
      title: 'Introduction to Python',
      author: 'Krace Kumar',
    },
    {
      title: "Hitchiker's Guide to Python",
      author: 'Kenneth Reitz',
    },
    {
      title: 'A Whirlwind Tour of Python',
      author: 'Jake VanderPlas',
    },
    {
      title: "Non Programmer's Tutorial for Python",
      author: 'Josh Cogliati',
    },
    {
      title: 'Think Python',
      author: 'Allen B. Downey',
    },
    {
      title: 'Introduction to Programming using Python',
      author: 'Cody Jackson',
    },
    {
      title: 'Learning to Program with Python',
      author: 'Richard L. Halterman',
    },
    {
      title: 'Problem Solving with Algorithms and Data Structures using Python',
      author: 'Bradley N. Miller, David L. Ranum',
    },
    {
      title: 'Dive into Python',
      author: 'Mark Pilgrim',
    },
  ],
  haskell: [
    {
      title: 'Anatomy of Programming Languages',
      author: 'William R. Cook',
    },
    {
      title: 'Learn You a Haskell for Great Good',
      author: 'Miran Lipovaca',
    },
    {
      title: 'Introduction to Haskell',
      author: 'Brent Yorgey',
    },
    {
      title: 'A Gentle Introduction to Haskell',
      author: 'Paul Hudak, John Peterson, Joseph Fasel',
    },
    {
      title: 'Beautiful Code, Compelling Evidence',
      author: 'Jeff Heard',
    },
    {
      title: 'Happy Learn Haskell Tutorial',
      author: 'Multiple',
    },
    {
      title: 'Learn Haskell Fast and Hard',
      author: 'Yann Esposito',
    },
    {
      title: 'Speeding through Haskell',
      author: 'Conrad Barski',
    },
    {
      title: 'Yet another Haskell tutorial',
      author: 'Hal Daume´ III',
    },
    {
      title: 'Parallel and Concurrent Programming in Haskell',
      author: 'Simon Marlow',
    },
  ],
};

export default function Bookshelf({ params }) {
  const { language = 'python' } = params;
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
  params: object,
};
