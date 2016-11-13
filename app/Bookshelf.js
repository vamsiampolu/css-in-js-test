import React, { PropTypes } from 'react';
import { CardHeader, CardMedia, CardText, CardActions, Card } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import LoremIpsum from 'react-lorem-component';
import { style } from 'glamor';
import { col, row } from 'flexboxgrid.js';
import LoremPixel from './LoremPixel';

const { string, arrayOf, shape } = PropTypes;

function Book({ title, author, cover }) {
  let Cover;
  if (cover == null) {
    Cover = LoremPixel;
  } else {
    Cover = (<img width="200" height="400" alt={title} src={cover} />);
  }

  return (
    <Card>
      <CardHeader title={title} subtitle={author} />
      <CardMedia>
        <Cover />
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
const rowStyle = style(row);

export default function Bookshelf({ books }) {
  let Books;
  if (books != null && books.length > 0) {
    Books = books.map(book => <div className={colAuto}><Book {...book} /></div>);
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
