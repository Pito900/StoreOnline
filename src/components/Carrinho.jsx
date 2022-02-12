import React from 'react';
import PropTypes from 'prop-types';

class Carrinho extends React.Component {
  constructor() {
    super();
    this.state = {
      nomes: [],
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
        nomes: [...PreveState.nomes, { nome: nameProductCard[i], quantity: counter }],
      }));
    }

    if (produtoDetalhado !== null) {
      this.setState((PreveState) => ({
        nomes: [...PreveState.nomes, produtoDetalhado[0]],
      }));
    }
  }

  render() {
    const { nomes } = this.state;
    return (
      <div>
        {nomes.length > 0 ? (nomes.map((produto, index) => (
          <div key={ index }>
            <p data-testid="shopping-cart-product-name">
              {produto.nome}
            </p>
            <p data-testid="shopping-cart-product-quantity">
              quantidade deste produto:
              {' '}
              {produto.quantity}
            </p>
          </div>)))
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
