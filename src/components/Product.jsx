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
      email: '',
      avaliacao: '',
      avaliacoes: [],
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

      const buscaAvaliacoes = localStorage.getItem('Avaliacoes');
      const avaliacoes = JSON.parse(buscaAvaliacoes);

      this.setState({ objProduct: resultObj });
      if (avaliacoes !== null) {
        const filtraPorProduto = avaliacoes.filter(
          (produto) => resultObj.title === produto.produto,
        );
        this.setState({ avaliacoes: filtraPorProduto });
      }
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

    valoresInput = (event) => {
      const { target } = event;
      const { name, value } = target;
      this.setState({
        [name]: value,
      });
    }

    trabalhaComArray = () => {
      const { email, avaliacao, nota, objProduct } = this.state;
      const avalia = { email, nota, avaliacao, produto: objProduct.title };
      this.setState((prevState) => ({ avaliacoes: [...prevState.avaliacoes, avalia] }),
        () => { this.trabalhaComStorage(); });
    }

    trabalhaComStorage = () => {
      const { avaliacoes } = this.state;
      const notas = JSON.stringify(avaliacoes);
      localStorage.setItem('Avaliacoes', notas);
      this.setState({ email: '', avaliacao: '', nota: '' });
    }

    render() {
      const {
        objProduct,
        cartProducts,
        nameProductCard,
        email,
        avaliacao,
        avaliacoes,
      } = this.state;

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

          <form>
            <label htmlFor="email">
              E-mail:
              <input
                type="text"
                name="email"
                value={ email }
                data-testid="product-detail-email"
                id="email"
                onChange={ this.valoresInput }
              />
            </label>
            <p>{ email }</p>

            <div
              onChange={ this.valoresInput }
            >
              <label htmlFor="input1">
                1
                <input
                  name="nota"
                  type="radio"
                  id="input1"
                  data-testid="1-rating"
                  value="1"
                />
              </label>

              <label htmlFor="input2">
                2
                <input
                  name="nota"
                  type="radio"
                  id="input2"
                  data-testid="2-rating"
                  value="2"
                />
              </label>

              <label htmlFor="input3">
                3
                <input
                  name="nota"
                  type="radio"
                  id="input3"
                  data-testid="3-rating"
                  value="3"
                />
              </label>

              <label htmlFor="input4">
                4
                <input
                  name="nota"
                  type="radio"
                  id="input4"
                  data-testid="4-rating"
                  value="4"
                />
              </label>

              <label htmlFor="input5">
                5
                <input
                  name="nota"
                  type="radio"
                  id="input5"
                  data-testid="5-rating"
                  value="5"
                />
              </label>
            </div>

            <label htmlFor="avaliacao">
              Deixe sua avaliação:
              <textarea
                name="avaliacao"
                value={ avaliacao }
                data-testid="product-detail-evaluation"
                id="avaliacao"
                onChange={ this.valoresInput }
              />
            </label>

            <button
              type="button"
              data-testid="submit-review-btn"
              onClick={ this.trabalhaComArray }
            >
              Enviar

            </button>
          </form>
          <h3>Avaliações de usuários:</h3>
          {avaliacoes.map((elemento, index) => (
            <div key={ index }>
              <h4>{elemento.email}</h4>
              <p>
                Nota:
                {elemento.nota}
              </p>
              <article>{elemento.avaliacao}</article>
            </div>
          ))}
        </div>
      );
    }
}

Product.propTypes = {
  match: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
};
