const stateUser = {
  user: {},
};

const user = (state = stateUser, action) => {
  if (action.type === "GET_USER") {
    return {
      ...state,
      user: action.payload,
    };
  }

  return state;
};

export { user };
