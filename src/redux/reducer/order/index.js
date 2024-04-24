const stateOrders = {
  orders: [],
};

const stateOrder = {
  order: [],
};

const stateIncome = {
  income: {},
};

const orders = (state = stateOrders, action) => {
  if (action.type === "GET_ORDERS") {
    return {
      ...state,
      orders: action.payload,
    };
  }

  return state;
};

const order = (state = stateOrder, action) => {
  if (action.type === "GET_ORDER") {
    return {
      ...state,
      order: action.payload,
    };
  }

  return state;
};

const income = (state = stateIncome, action) => {
  if (action.type === "GET_INCOME") {
    return {
      ...state,
      income: action.payload,
    };
  }

  return state;
};

export { orders, order, income };
