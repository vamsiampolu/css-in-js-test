import React, { Component, PropTypes } from 'react';
import { style, keyframes, merge } from 'glamor';
import { withState, withProps, compose, lifecycle } from 'recompose';

const { string, number, bool, object } = PropTypes;

const defaultWrapperStyle = {
  width: 200,
  height: 200,
  backgroundColor: 'white',
  backgroundSize: 'contain',
  backgroundRepeat: 'none',
  boxSizing: 'border-box',
  position: 'relative',
};

const PENDING = 'PENDING';
const LOADING = 'LOADING';
const LOADED = 'LOADED';
const FAILED = 'FAILED';

export function LoadingIndicator() {
  const ring = keyframes({
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  });

  const loadingStyle = style({
    position: 'absolute',
    display: 'block',
    width: 40,
    height: 40,
    top: '37%',
    left: '37%',
    borderRadius: 80,
    boxShadow: '0 3px 0 0 #59ebff',
    animation: `${ring} 1s linear infinite`,
  });

  return (<div {...loadingStyle} />);
}

export function ErrorIndicator() {
  const crossArm = {
    background: '#000',
    width: 5,
    height: 50,
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'rotate(45deg)',
  };

  const otherCrossArm = style({
    ...crossArm,
    transform: 'rotate(-45deg)',
  });

  return (<div>
        <div {...style(crossArm)} />
        <div {...otherCrossArm} />
      </div>);
}

export function SimpleImage(props) {
  const {
    src,
    width = 200,
    height = 200,
    rounded,
    circle,
    status,
    onLoad,
    onFail,
    loadingIndicator = (<LoadingIndicator />),
    errorIndicator = (<ErrorIndicator />)
  } = props;

  const mainWrapperStyle = style({
    backgroundColor: 'white',
    backgroundSize: 'contain',
    backgroundRepeat: 'none',
    boxSizing: 'border-box',
    position: 'relative',
    width,
    height,
  });

  const roundedStyle = style({
    borderRadius: '10%',
    overflow: 'hidden',
  });

  const circularStyle = style({
    borderRadius: '50%',
    overflow: 'hidden',
  });

  const defaultImageStyle = style({
    opacity: 0,
    transisition: 'opacity 150ms ease',
  });

  const loadedImageStyle = style({
    opacity: 1,
  });

  let imageStyle = defaultImageStyle;

  let wrapperStyle = mainWrapperStyle;
  if (rounded) {
    wrapperStyle = merge(mainWrapperStyle, roundedStyle);
  } else if (circle) {
    wrapperStyle = merge(mainWrapperStyle, circularStyle);
  }

  if (status === LOADED) {
    imageStyle = merge(defaultImageStyle, loadedImageStyle);
  }

  const image = (<img
      {...imageStyle}
      src={src}
      width={width}
      height={height}
      role="presentation"
      onLoad={onLoad}
      onError={onFail}
      />);

  let statusIndicator = null;
  if (status === LOADING) {
    statusIndicator = loadingIndicator;
  } else if (status === FAILED) {
    statusIndicator = errorIndicator;
  }

  return (<div {...wrapperStyle}>
    {statusIndicator}
    {image}
  </div>);
}

const Image = compose(
  withState(
    'status',
    'setStatus',
    ({ src })=> src? LOADING: PENDING
  ),
  withProps(
    ({ setStatus }) => ({
    onLoad() {
      setStatus(LOADED);
    },
    onFail() {
      setStatus(FAILED);
    },
    reset() {
      setStatus(PENDING)
    },
    resetToLoading() {
      setStatus(LOADING)
    },
  })),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if(nextProps.src == null){
        this.props.reset();
      } else if(nextProps.src !== this.props.src) {
        this.props.resetToLoading();
      }
    }
  })
)(SimpleImage);

Image.propTypes = {
  src: string.isRequired,
  width: number.isRequired,
  height: number.isRequired,
  alt: string,
  loadingStyle: object,
  failureStyle: object,
  circle: bool,
  rounded: bool,
};

export default Image;
