import React, { PropTypes } from 'react';
import { style, merge } from 'glamor';
import { withState, withProps, compose, lifecycle } from 'recompose';
import LoadingIndicator from './LoadingIndicator';
import ErrorIndicator from './ErrorIndicator';

const { string, number, bool, object, oneOf, func, element } = PropTypes;

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

export function SimpleImage(props) {
  const {
    src,
    alt,
    srcset,
    sizes,
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
      alt={alt}
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

SimpleImage.propTypes = {
  src: string,
  width: number.isRequired,
  height: number.isRequired,
  alt: string.isRequired,
  sizes: string,
  srcset: string,
  circle: bool,
  rounded: bool,
  status: oneOf([ PENDING, LOADING, LOADED, FAILED ]),
  onLoad: func,
  onFail: func,
  loadingIndicator: element,
  failureIndicator: element,
};

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
