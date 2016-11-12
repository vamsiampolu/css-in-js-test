import React, { Component, PropTypes } from 'react';

class MobileTearSheet extends Component {

  render() {
    const {
      prepareStyles,
    } = this.context.muiTheme;

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
        height: this.props.height,
        overflow: 'hidden',
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
          {this.props.children}
        </div>
        <img style={prepareStyles(styles.bottomTear)} role="presentation" src="https://raw.githubusercontent.com/callemall/material-ui/master/docs/src/www/images/bottom-tear.svg" />
      </div>
    );
  }
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
