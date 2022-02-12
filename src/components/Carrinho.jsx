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

  addLess = ({ target }) => {
    const textName = target.previousElementSibling.previousElementSibling.textContent
    const { nomes } = this.state;
    const ObjChange = nomes.find((produto) => textName === produto.nome);
    let counter = ObjChange.quantity -1
    if(counter>=0) {
      ObjChange.quantity = counter 
      this.setState({
        nome: ObjChange,
      })    
    }  
  }

  addMore = ({ target }) => {
    const textName = target.parentNode.firstChild.textContent
    const { nomes } = this.state;
    const ObjChange = nomes.find((produto) => textName === produto.nome);
    let counter = ObjChange.quantity +1
    ObjChange.quantity = counter 
    this.setState({
      nome: ObjChange,
    })    
  }

dellProduct = ({ target }) => {
  const textName = target.parentNode.childNodes[0].textContent
  const { nomes } = this.state;
  const newObjtName = nomes.filter((produto) => textName !== produto.nome);
  this.setState({
    nomes: newObjtName
  })  
  
  }

  render() {
    const { nomes } = this.state;
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
            <button data-testid="product-decrease-quantity" onClick={ this.addLess }>-</button>
             <button data-testid="product-increase-quantity"onClick={ this.addMore }>+</button>
             <button onClick={ this.dellProduct }>X</button>
          </div>
          <button type="button">Finalizar a compra</button>
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
