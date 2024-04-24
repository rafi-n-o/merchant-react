const stateNeeds = {
  needs: [],
};

const needs = (state = stateNeeds, action) => {
  if (action.type === "GET_NEEDS") {
    return {
      ...state,
      needs: action.payload,
    };
  }

  return state;
};

export { needs };
