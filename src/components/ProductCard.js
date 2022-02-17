import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Styles/card-style.css';

export default class ProductCard extends Component {
  render() {
    const { title, picture, price, freteGratis } = this.props;

    return (

      <div data-testid="product" className="card">
        <h1>{ title }</h1>
        <img src={ picture } alt="Product" />
        <h2>{ price }</h2>
        {freteGratis
        && <p className="free" data-testid="free-shipping">Frete Grátis Disponível</p>}

      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  freteGratis: PropTypes.bool.isRequired,
};
