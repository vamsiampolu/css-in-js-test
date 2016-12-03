import React, { PropTypes } from 'react';
import { withState, withProps, compose, lifecycle } from 'recompose';
import SimpleImage from './SimpleImage';

const PENDING = 'PENDING';
const LOADING = 'LOADING';
const LOADED = 'LOADED';
const FAILED = 'FAILED';

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

export default Image;
