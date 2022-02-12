import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { addToCart, dataId } = this.props;
    return (
      <button
        data-testid={ dataId }
        type="submit"
        onClick={ addToCart }
      >
        addTocart
      </button>
    );
  }
}

Button.propTypes = {
  addToCart: PropTypes.func.isRequired,
  dataId: PropTypes.string.isRequired,
};

export default Button;
