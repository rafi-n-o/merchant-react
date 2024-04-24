const stateProducts = {
  products: [],
};

const stateProduct = {
  product: {},
};

const products = (state = stateProducts, action) => {
  if (action.type === "GET_PRODUCTS") {
    return {
      ...state,
      products: action.payload,
    };
  }

  return state;
};

const product = (state = stateProduct, action) => {
  if (action.type === "GET_PRODUCT") {
    return {
      ...state,
      product: action.payload,
    };
  }

  return state;
};

export { products, product };
