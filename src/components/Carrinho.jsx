import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Carrinho extends React.Component {
  constructor() {
    super();
    this.state = {
      nomes: [],
      disableButton: false,
    };
  }

  componentDidMount() {
    const { location: { state: { cartProducts, nameProductCard } } } = this.props;
    const localProdutoDetalhado = localStorage.getItem('ProdutoDetalhes');
    // const localProdutos = localStorage.getItem('Produtos');
    // const localCarrinho = localStorage.getItem('Carrinho');
    const produtoDetalhado = JSON.parse(localProdutoDetalhado);
    // const produtos = JSON.parse(localProdutos);
    // const carrinho = JSON.parse(localCarrinho);

    for (let i = 0; i < nameProductCard.length; i += 1) {
      let counter = 0;
      for (let k = 0; k < cartProducts.length; k += 1) {
        if (nameProductCard[i] === cartProducts[k].title) {
          counter += 1;
        }
      }
      this.setState((PreveState) => ({
        nomes: [...PreveState.nomes, { nome: nameProductCard[i],
          quantity: counter,
          estoque: cartProducts[i].available_quantity }],
      }));
    }

    if (produtoDetalhado !== null) {
      this.setState((PreveState) => ({
        nomes: [...PreveState.nomes, produtoDetalhado[0]],
      }));
    }
  }

  donePurchases = (ListaDoCarrinho) => {
    const listCoFromCarrinho = JSON.stringify(ListaDoCarrinho);
    localStorage.setItem('ProductsCoFromCarrinho', listCoFromCarrinho);
  }

  addLess = ({ target }) => {
    const textName = target.previousElementSibling.previousElementSibling.textContent;
    const { nomes } = this.state;
    const ObjChange = nomes.find((produto) => textName === produto.nome);
    const counter = ObjChange.quantity - 1;
    if (counter >= 0) {
      ObjChange.quantity = counter;
      this.setState(() => ({}));
    }
  }

  addMore = ({ target }) => {
    const textName = target.parentNode.firstChild.textContent;
    const { nomes } = this.state;
    const ObjChange = nomes.find((produto) => textName === produto.nome);
    if (ObjChange.quantity < ObjChange.estoque) {
      const counter = ObjChange.quantity + 1;
      ObjChange.quantity = counter;
      this.setState(() => ({}));
    } else {
      this.setState({ disableButton: true });
    }
  }

dellProduct = ({ target }) => {
  const textName = target.parentNode.childNodes[0].textContent;
  const { nomes } = this.state;
  const newObjtName = nomes.filter((produto) => textName !== produto.nome);
  this.setState({
    nomes: newObjtName,
  });
}

render() {
  const { nomes, disableButton } = this.state;
  return (
    <div>
      {nomes.length > 0 ? (nomes.map((produto, index) => (
        <>
          <div key={ index }>
            <p data-testid="shopping-cart-product-name">
              {produto.nome}
            </p>
            <p data-testid="shopping-cart-product-quantity">
              quantidade deste produto:
              {' '}
              {produto.quantity}
            </p>
            <button
              type="button"
              data-testid="product-decrease-quantity"
              onClick={ this.addLess }
            >
              -
            </button>
            <button
              type="button"
              data-testid="product-increase-quantity"
              disabled={ disableButton }
              onClick={ this.addMore }
            >
              +
            </button>
            <button
              type="button"
              onClick={ this.dellProduct }
            >
              X
            </button>
          </div>
          <Link to="/Checkout">
            <button
              type="button"
              data-testid="checkout-products"
              onClick={ () => this.donePurchases(nomes) }
            >
              Finalizar a compra

            </button>
          </Link>
        </>
      )))
        : (
          <p
            data-testid="shopping-cart-empty-message"
          >
            Seu carrinho está vazio
          </p>)}
    </div>
  );
}
}

Carrinho.propTypes = {
  cartProducts: PropTypes.array,
  nameProductCard: PropTypes.array,
}.isRequired;

export default Carrinho;
