import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import '../Styles/Home.css';
import ProductCard from './ProductCard';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      completeList: [],
      listCategories: [],
      inputValue: '',
      products: [],
    };
  }

  componentDidMount() {
    this.getCategoriesList();
  }

  getCategoriesList = async () => {
    const response = await getCategories();
    this.setState({ completeList: response });
    response.forEach((e) => {
      this.setState((prevState) => ({
        listCategories: [...prevState.listCategories, e.name] }));
    });
  }

  inputChange = ({ target }) => {
    const valueInput = target.value;
    this.setState({ inputValue: valueInput });
  }

  handleButton = async (valueInput) => {
    const result = await getProductsFromCategoryAndQuery('', valueInput);
    const getProduct = result.results;
    this.setState({ products: getProduct });
  }

  filterByCategory = ({ target }) => {
    const { name } = target;
    const { completeList } = this.state;
    const produto = completeList.find((e) => e.name === name);
    this.chamaRequisição(produto);
  }

  chamaRequisição = async (categoryId) => {
    const result = await getProductsFromCategoryAndQuery(categoryId.id);
    const product = result.results;
    this.setState({ products: product });
  }

  savelistProduct = (listProduct) => {
    const list = JSON.stringify(listProduct);
    localStorage.setItem('Products', list)
  }

  render() {
    const { listCategories, inputValue, products } = this.state;

    return (
      <div className="main">
        <aside>
          <ul>
            {listCategories.map((categorie, index) => (
              <label
                data-testid="category"
                htmlFor={ categorie }
                key={ index }
              >
                <input
                  id={ categorie }
                  name={ categorie }
                  type="radio"
                  onChange={ this.filterByCategory }
                />

                {categorie}
              </label>
            ))}
          </ul>
        </aside>
        <section className="section-right">
          <section>
            <input
              className="input-category"
              type="text"
              name="inputValue"
              value={ inputValue }
              onChange={ this.inputChange }
              data-testid="query-input"
            />
            <button
              className="btn-search"
              type="button"
              data-testid="query-button"
              onClick={ () => { this.handleButton(inputValue); } }
            >
              buscar
            </button>
            <Link to="/carrinho" data-testid="shopping-cart-button">
              <img className="icone" src="https://cdn-icons-png.flaticon.com/512/126/126510.png" alt="carrinho de compra" />
            </Link>
            <p
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          </section>
          <section className="card-list">
            {
              products.map((product, index) => {
                const { title, thumbnail, price, id } = product;
                return (
                  <Link
                    key={ index }
                    data-testid="product-detail-link"
                    to={`/product/${ id }`}
                    onClick={() => { this.savelistProduct(products); }}
                  >
                    <ProductCard
                      title={ title }
                      picture={ thumbnail }
                      price={ price }
                    />
                  </Link>
                );
              })
            }
          </section>
        </section>

      </div>
    );
  }
}

export default Home;
