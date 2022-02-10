export async function getCategories() {
  try {
    const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
}

export async function getProductsFromCategoryAndQuery(categoryId = '', query = '') {
  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
}
