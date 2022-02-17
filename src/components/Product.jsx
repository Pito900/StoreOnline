import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import '../Styles/product-info.css';

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objProduct: {},
      cont: [],
      name: '',
      email: '',
      avaliacao: '',
      avaliacoes: [],
      nota: '1',
      freteGratis: false,
    };
  }

  componentDidMount() {
    this.getObjLocalStorage();
  }

    getObjLocalStorage = async () => {
      const { match: { params: { id } } } = this.props;

      const idDaCategoria = localStorage.getItem('idCategory');
      const categoria = JSON.parse(idDaCategoria);

      const arrayProdutos = await getProductsFromCategoryAndQuery(categoria);
      const arrayProdutosCategoria = arrayProdutos.results;

      const resultObj = arrayProdutosCategoria.find((e) => e.id === id);

      const buscaAvaliacoes = localStorage.getItem(`Avaliações${resultObj.id}`);
      const avaliacoes = JSON.parse(buscaAvaliacoes);

      this.setState({
        objProduct: resultObj,
        freteGratis: resultObj.shipping.free_shipping,
      });

      if (avaliacoes !== null) {
        this.setState({ avaliacoes });
      }
    }

    nomeClick = () => {
      const quantt = localStorage.getItem('quant');
      const quantLstorage = JSON.parse(quantt);
      const { objProduct } = this.state;
      this.setState((prevState) => ({ cont: [...prevState.cont, objProduct],
        name: objProduct.title,
      }));
      const add1 = quantLstorage + 1;
      const listCarrinho = JSON.stringify(add1);
      localStorage.setItem('quant', listCarrinho);
    }

    valoresInput = (event) => {
      const { target } = event;
      const { name, value } = target;
      this.setState({
        [name]: value,
      });
    }

    trabalhaComArray = (e) => {
      e.preventDefault();
      const { email, avaliacao, nota, objProduct, avaliacoes } = this.state;
      const avalia = { email, nota, avaliacao, produto: objProduct.id };
      const newAvaliacao = [...avaliacoes, avalia];
      const notas = JSON.stringify(newAvaliacao);
      localStorage.setItem(`Avaliações${objProduct.id}`, notas);

      const buscaAvaliacoes = localStorage.getItem(`Avaliações${objProduct.id}`);
      const newAvalia = JSON.parse(buscaAvaliacoes);

      this.setState({ email: '', avaliacao: '', nota: '1', avaliacoes: newAvalia });
    }

    render() {
      const {
        objProduct,
        name,
        email,
        avaliacao,
        avaliacoes,
        freteGratis,
        nota,
        cont,
      } = this.state;
      const quantt = localStorage.getItem('quant');
      const quantLstorage = JSON.parse(quantt);
      const { title, thumbnail, price } = objProduct;
      return (
        <div className="productInfo">
          <p data-testid="shopping-cart-size">{quantLstorage}</p>
          <Link
            data-testid="shopping-cart-button"
            to={ { pathname: '/carrinho',
              state: { cont, name } } }
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
            {freteGratis
          && <p className="free" data-testid="free-shipping">Frete Grátis Disponível</p>}
          </div>

          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ this.nomeClick }
          >
            addToCart
          </button>

          <form>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                name="email"
                value={ email }
                data-testid="product-detail-email"
                id="email"
                onChange={ this.valoresInput }
              />
            </label>

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
                  checked={ nota === '1' }
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
              type="submit"
              data-testid="submit-review-btn"
              onClick={ (e) => this.trabalhaComArray(e) }
            >
              Enviar

            </button>
          </form>
          <h3>Avaliações de usuários:</h3>
          {avaliacoes.map((elemento, index) => (
            <div key={ index }>
              <p>{elemento.email}</p>
              <p>
                {elemento.nota}
              </p>
              <p>{elemento.avaliacao}</p>
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
