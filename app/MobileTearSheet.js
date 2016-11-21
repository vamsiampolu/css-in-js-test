import React, { PropTypes } from 'react';
import bottomTear from './bottomTear.svg';

function Icon({ width = 16, height = 16, glyph, className = 'icon', style }) {
  return (
    <svg className={className} style={style} width={width} height={height}>
      <use xlinkHref={glyph} />
    </svg>
  );
}

Icon.propTypes = {
  width: PropTypes.oneOf(PropTypes.number, PropTypes.string),
  height: PropTypes.oneOf(PropTypes.number, PropTypes.string),
  glyph: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
};

function MobileTearSheet(props, context) {
  const { prepareStyles } = context.muiTheme;

  const styles = {
    root: {
      marginBottom: 24,
      marginRight: 24,
      maxWidth: 360,
      width: '100%',
    },
    container: {
      border: 'solid 1px #d9d9d9',
      borderBottom: 'none',
      overflow: 'hidden',
      height: '100%',
    },
    bottomTear: {
      display: 'block',
      position: 'relative',
      marginTop: -10,
      maxWidth: 360,
    },
  };

  return (
    <div style={prepareStyles(styles.root)}>
      <div style={prepareStyles(styles.container)}>
        {props.children}
      </div>
      <Icon width="100%" style={prepareStyles(styles.bottomTear)} glyph={bottomTear} />
    </div>
  );
}

MobileTearSheet.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

MobileTearSheet.propTypes = {
  children: PropTypes.node,
  height: PropTypes.number.isRequired,
};

MobileTearSheet.defaultProps = {
  height: 500,
};


export default MobileTearSheet;
