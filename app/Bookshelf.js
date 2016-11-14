import React, { PropTypes } from 'react';
import { CardHeader, CardTitle, CardMedia, CardText, CardActions, Card } from 'material-ui/Card';
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

  const cardHeaderTextStyle = {
    paddingRight: 0,
  };

  const containerStyle = {
    height: '20em',
    padding: 0,
  };

  const titleStyle = {
    fontSize: 13,
  };

  const headerRootStyle = {
    padding: 8,
  };

  const actionsStyle = {
    bottom: '2.5em',
    left: '6.5em',
  };

  const authorStyle = style({
    fontSize: 12,
    paddingLeft: 8,
    position: 'relative',
    bottom: 8,
  });

  const textStyle = {
    fontSize: 10,
    padding: 8,
  };

  return (
    <Card containerStyle={containerStyle}>
      <CardHeader 
        title={title} 
        style={headerRootStyle} 
        textStyle={cardHeaderTextStyle} 
        titleStyle={titleStyle} 
      />
      <span className={authorStyle}>{author}</span>
      <CardMedia>
        <Cover width={200} height={100} />
      </CardMedia>
      <CardText style={textStyle}>
        <LoremIpsum />
      </CardText>
      <CardActions style={actionsStyle}>
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
