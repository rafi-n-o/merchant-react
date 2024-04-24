const stateFamilies = {
  families: [],
};

const families = (state = stateFamilies, action) => {
  if (action.type === "GET_FAMILIES") {
    return {
      ...state,
      families: action.payload,
    };
  }

  return state;
};

export { families };
