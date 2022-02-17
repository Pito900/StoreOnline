import React from 'react';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      listFromCarrinho: [],
    };
  }

  componentDidMount() {
    const produtosDoCarrinho = localStorage.getItem('ProductsCoFromCarrinho');
    const produtosFromCarrinho = JSON.parse(produtosDoCarrinho);
    this.setState({
      listFromCarrinho: produtosFromCarrinho,
    });
  }

  render() {
    const { listFromCarrinho } = this.state;
    return (
      <div>
        <section>
          {listFromCarrinho.map((produto, index) => (
            <div key={ index }>
              <p data-testid="shopping-cart-product-name">
                {produto.nome}
              </p>
              <p testicá="shopping-cart-product-quantity">
                quantidade deste produto:
                {' '}
                {produto.quantity}
              </p>
            </div>
          ))}
        </section>
        <section>
          <label htmlFor="nomeCompleto">
            Digite seu Nome Completo:
            <input
              id="nomeCompleto"
              type="text"
              data-testid="checkout-fullname"
              placeholder="Nome"
            />
          </label>
          <label htmlFor="DigiteOEmail">
            Digite seu Email:
            <input
              id="DigiteOEmail"
              type="email"
              data-testid="checkout-email"
              placeholder="Email"
            />
          </label>
          <label htmlFor="DigiteSeuCPF">
            Digite seu CPF:
            <input
              id="DigiteSeuCPF"
              type="text"
              data-testid="checkout-cpf"
              placeholder="CPF - Apenas números"
            />
          </label>
          <label htmlFor="DigiteSeuTelefone">
            Digite um Número de Contato:
            <input
              id="DigiteSeuTelefone"
              type="text"
              data-testid="checkout-phone"
              placeholder="Telefone - Apenas números"
            />
          </label>
          <label htmlFor="DigiteO-CEP">
            Digite o CEP do Endereço:
            <input
              id="DigiteO-CEP"
              type="text"
              data-testid="checkout-cep"
              placeholder="CEP - Apenas números"
            />
          </label>
          <label htmlFor="endereço">
            Digite seu Endereço:
            <input
              id="endereço"
              type="text"
              data-testid="checkout-address"
              placeholder="Endereço"
            />
          </label>
        </section>
        <button
          type="button"
          data-testid="checkout-products"
        >
          Comprar
        </button>
      </div>
    );
  }
}

export default Checkout;
