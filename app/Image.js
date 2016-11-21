import React, { Component, PropTypes } from 'react';
import { style, keyframes, merge } from 'glamor';

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

export default class Image extends Component {
  constructor(props) {
    super(props);
    if (props.src != null && typeof props.src === 'string') {
      this.state = {
        status: LOADING,
      };
    } else {
      this.state = {
        status: PENDING,
      };
    }
    this.onLoad = this.onLoad.bind(this);
    this.onFail = this.onFail.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({
        status: LOADING,
      });
    }
  }

  onLoad() {
    this.setState({
      status: LOADED,
    });
  }

  onFail() {
    this.setState({
      status: FAILED,
    });
  }
  render() {
    const {
      src,
      width,
      height,
      alt,
      loadingStyle,
      failureStyle,
      rounded,
      circle,
    } = this.props;
    const mainWrapperStyle = style({
      ...defaultWrapperStyle,
      width,
      height,
    });

    let wrapperStyle = {};
    if (rounded) {
      const roundedStyle = style({
        borderRadius: '10%',
        overflow: 'hidden',
      });

      wrapperStyle = merge(mainWrapperStyle, roundedStyle);
    } else if (circle) {
      const circularStyle = style({
        borderRadius: '50%',
        overflow: 'hidden',
      });

      wrapperStyle = merge(mainWrapperStyle, circularStyle);
    } else {
      wrapperStyle = mainWrapperStyle;
    }

    const defaultImageStyle = style({
      opacity: 0,
      transisition: 'opacity 150ms ease',
    });

    const loadedImageStyle = style({
      opacity: 1,
    });

    let imageStyle = defaultImageStyle;

    if (this.state.status === LOADED) {
      imageStyle = merge(defaultImageStyle, loadedImageStyle);
    } else {
      imageStyle = defaultImageStyle;
    }


    let image;
    if (alt != null) {
      image = (<img
        className={imageStyle}
        src={src}
        width={width}
        height={height}
        alt={alt}
        onLoad={this.onLoad}
        onError={this.onFail}
      />);
    } else {
      image = (<img
        className={imageStyle}
        src={src}
        width={width}
        height={height}
        role="presentation"
        onLoad={this.onLoad}
        onError={this.onFail}
      />);
    }

    let statusIndicator = null;
    if (this.state.status === LOADING) {
      statusIndicator = (<div className={loadingStyle} />);
    } else if (this.state.status === FAILED) {
      statusIndicator = (<div className={failureStyle} />);
    }

    return (<div className={wrapperStyle}>
      {statusIndicator}
      {image}
    </div>);
  }
}

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


const crossArm = {
  background: '#00',
  width: 5,
  height: 10,
  position: 'absolute',
  top: '30%',
  left: '50%',
};

const failureStyle = style({
  ...crossArm,
  transform: 'rotate(45deg)',
  ':before': {
    ...crossArm,
    content: '',
    top: 0,
    left: 0,
    transform: 'rotate(-90deg)',
  },
});

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

Image.defaultProps = {
  loadingStyle,
  failureStyle,
  circle: false,
  rounded: true,
};
