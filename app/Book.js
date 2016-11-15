import React, { PropTypes } from 'react';
import { style } from 'glamor';
import { CardHeader, CardMedia, CardText, CardActions, Card } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import LoremPixel from './LoremPixel';
import LoremIpsum from './LoremIpsum';

const { string } = PropTypes;

export default function Book({ title, author, cover }) {
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
    height: '16em',
    padding: 0,
    position: 'relative',
  };

  const titleStyle = {
    fontSize: 13,
  };

  const headerRootStyle = {
    padding: 8,
  };

  const actionsStyle = {
    padding: 0,
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginTop: 5,
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
