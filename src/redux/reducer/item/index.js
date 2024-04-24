const stateItems = {
  items: [],
};

const stateItem = {
  item: {},
};

const items = (state = stateItems, action) => {
  if (action.type === "GET_ITEMS") {
    return {
      ...state,
      items: action.payload,
    };
  }

  return state;
};
const item = (state = stateItem, action) => {
  if (action.type === "GET_ITEM") {
    return {
      ...state,
      item: action.payload,
    };
  }

  return state;
};

export { items, item };
