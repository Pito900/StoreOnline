import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  render() {
    const { title, picture, price } = this.props;

    return (
      <div>
        <h1 data-testid="product">{ title}</h1>
        <img src={ picture } alt="Product" data-testid="product" />
        <h2 data-testid="product">{ price }</h2>
      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
