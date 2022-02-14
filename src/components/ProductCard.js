import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import '../Styles/card-style.css';

export default class ProductCard extends Component {
  render() {
    const { title, picture, price, addToCart, freteGratis } = this.props;

    return (

      <div data-testid="product" className="card">
        <h1>{ title }</h1>
        <img src={ picture } alt="Product" />
        <h2>{ price }</h2>
        {freteGratis
        && <p className="free" data-testid="free-shipping">Frete Grátis Disponível</p>}
        <Button addToCart={ addToCart } dataId="product-add-to-cart" />
      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired,
  freteGratis: PropTypes.bool.isRequired,
};
