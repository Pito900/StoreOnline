import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/product-info.css';
import PropTypes from 'prop-types';
import Button from './Button';

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objProduct: {},
      cont: 0,
      nome: '',
      cartProducts: [],
      nameProductCard: [],
    };
  }

  componentDidMount() {
    this.getObjLocalStorage();
  }

    getObjLocalStorage = () => {
      const { match: { params: { id } } } = this.props;
      const listText = localStorage.getItem('Products');
      const listJson = JSON.parse(listText);
      const resultObj = listJson.find((e) => e.id === id);
      this.setState({ objProduct: resultObj });
    }

    nomeClick = () => {
      const { objProduct } = this.state;
      this.setState((prevState) => ({ cont: prevState.cont + 1, nome: objProduct.title }),
        () => { this.addNoLocalStorage(); });
    }

    addNoLocalStorage = () => {
      const { nome, cont } = this.state;
      const produto = [{ nome, quantity: cont }];
      const list = JSON.stringify(produto);
      localStorage.setItem('ProdutoDetalhes', list);
    }

    render() {
      const { objProduct, cartProducts, nameProductCard } = this.state;
      const { title, thumbnail, price } = objProduct;
      return (
        <div className="productInfo">

          <Link
            data-testid="shopping-cart-button"
            to={ { pathname: '/carrinho', state: { cartProducts, nameProductCard } } }
          >
            <img className="icone" src="https://cdn-icons-png.flaticon.com/512/126/126510.png" alt="carrinho de compra" />
          </Link>

          <div className="product">
            <h1 data-testid="product-detail-name">{ title }</h1>
            <img alt="ProductImage" src={ thumbnail } />
            <h2>
              R$
              { price }
            </h2>
          </div>
          <Button addToCart={ this.nomeClick } dataId="product-detail-add-to-cart" />
        </div>
      );
    }
}

Product.propTypes = {
  match: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
};
