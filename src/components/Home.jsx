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
      cartProducts: [],
      nameProductCard: [],
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

  addCart = (id) => {
    const { products, cartProducts, nameProductCard } = this.state;
    const produto = products.find((product) => product.id === id);
    this.setState({
      cartProducts: [...cartProducts, produto],
    });
    if (!nameProductCard.includes(produto.title)) {
      this.setState({
        nameProductCard: [...nameProductCard, produto.title] });
    }
  }

  filterByCategory = ({ target }) => {
    const { id } = target;
    const { completeList } = this.state;
    const produto = completeList.find((e) => e.name === id);
    this.chamaRequisição(produto);
  }

  chamaRequisição = async (categoryId) => {
    const result = await getProductsFromCategoryAndQuery(categoryId.id);
    const product = result.results;
    this.setState({ products: product });
  }

  savelistProduct = (listProduct) => {
    const list = JSON.stringify(listProduct);
    localStorage.setItem('Products', list);
  }

  render() {
    const { listCategories,
      inputValue,
      products,
      cartProducts,
      nameProductCard } = this.state;

    // const list1 = JSON.stringify(nameProductCard);
    // localStorage.setItem('Produtos', list1);
    // const list2 = JSON.stringify(cartProducts);
    // localStorage.setItem('Carrinho', list2);

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
                  name="product"
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
            <Link
              data-testid="shopping-cart-button"
              to={ { pathname: '/carrinho', state: { cartProducts, nameProductCard } } }
            >
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
                const { title, thumbnail, price, id, shipping } = product;
                return (
                  <div key={ index }>
                    <ProductCard
                      title={ title }
                      picture={ thumbnail }
                      price={ price }
                      freteGratis={ shipping.free_shipping }
                      addToCart={ () => this.addCart(id) }
                    />
                    <Link
                      data-testid="product-detail-link"
                      to={ `/product/${id}` }
                      onClick={ () => { this.savelistProduct(products); } }
                    >
                      <button type="button">Ver detalhes</button>
                    </Link>
                  </div>
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
