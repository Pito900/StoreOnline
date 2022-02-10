import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  render() {
    const { title, picture, price } = this.props;

    return (
      <div data-testid="product">
        <h1>{ title }</h1>
        <img src={ picture } alt="Product" />
        <h2>{ price }</h2>
      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
