import React, { PropTypes } from 'react';
import { CardHeader, CardMedia, CardText, CardActions, Card } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import LoremIpsum from 'react-lorem-component';
import LoremPixel from './LoremPixel';

const { string } = PropTypes;

function Book({ title, author, cover }) {
  let Cover;
  if(cover == null) {
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

function Bookshelf({ books }) {
}

Bookshelf.propTypes = {};
