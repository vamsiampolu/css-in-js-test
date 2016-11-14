import React, { PropTypes, Component } from 'react';

class EllipsisText extends Component {
  constructor(props) {
    super(props);
    this.onExpand = this.onExpand.bind(this);
    this.state = { expanded: false, btnText: 'More' };
  }

  onExpand() {
    const showHide = (state) => {
      const expanded = !state.expanded;
      const btnText = expanded ? 'Less' : 'More';
      return { expanded, btnText };
    };
    this.setState(showHide);
  }

  render() {
    const { text, expandable, limit } = this.props;

    if (text.trim() === '') {
      return null;
    }

    let displayText = text;
    let expandButton;

    if (text.trim().length > limit) {
      const truncatedText = text.trim().substr(0, 300);

      if (expandable) {
        expandButton = (<button
          type="button"
          onClick={this.onExpand}
        >
          {this.state.btnText}
        </button>);
      }

      if (!this.state.expanded) {
        displayText = `${truncatedText}...`;
      }
    }

    return (<div>{displayText}{expandable ? expandButton : ''}</div>);
  }
}

EllipsisText.defaultProps = {
  expandable: false,
  limit: 300,
  text: '',
};

const { bool, number, string } = PropTypes;

EllipsisText.propTypes = {
  expandable: bool,
  limit: number,
  text: string,
};

export default EllipsisText;
