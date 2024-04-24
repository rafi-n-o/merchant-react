const stateCustomers = {
  customers: [],
};

const customers = (state = stateCustomers, action) => {
  if (action.type === "GET_CUSTOMERS") {
    return {
      ...state,
      customers: action.payload,
    };
  }

  return state;
};

export { customers };
