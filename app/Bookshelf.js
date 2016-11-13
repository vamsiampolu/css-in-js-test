import React, { PropTypes } from 'react';
import { CardHeader, CardMedia, CardText, CardActions, Card } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { style, merge } from 'glamor';
import uuid from 'node-uuid';
import { col, row } from 'flexboxgrid.js';
import LoremPixel from './LoremPixel';
import LoremIpsum from './LoremIpsum';

const { string, arrayOf, shape } = PropTypes;

function Book({ title, author, cover }) {
  let Cover;
  if (cover == null) {
    Cover = LoremPixel;
  } else {
    Cover = (<img width="200" height="100" alt={title} src={cover} />);
  }

  const containerStyle = {
    height: '20em',
  };

  return (
    <Card containerStyle={containerStyle}>
      <CardHeader title={title} subtitle={author} />
      <CardMedia>
        <Cover width={200} height={100} />
      </CardMedia>
      <CardText>
        <LoremIpsum />
      </CardText>
      <CardActions>
        <FlatButton label="Buy Now" />
      </CardActions>
    </Card>
  );
}

Book.propTypes = {
  title: string,
  author: string,
  cover: string,
};

const colAuto = style(col());
const dontExpand = style({
  flexGrow: 0,
  flexShrink: 0,
});

const headRoom = {
  marginTop: '2em',
};

const colFixedWidth = merge(colAuto, dontExpand, headRoom);
const rowStyle = style(row);

export default function Bookshelf({ books }) {
  let Books;
  if (books != null && books.length > 0) {
    Books = books.map(book => (<div
      key={uuid.v4()}
      className={colFixedWidth}
    >
      <Book {...book} />
    </div>)
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
