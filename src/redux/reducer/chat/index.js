const stateChats = {
  chats: [],
};

const stateTotalUnread = {
  total_unread: "",
};

const chats = (state = stateChats, action) => {
  if (action.type === "GET_CHATS") {
    return {
      ...state,
      chats: action.payload,
    };
  }

  return state;
};

const totalUnread = (state = stateTotalUnread, action) => {
  if (action.type === "GET_TOTAL_UNREAD") {
    return {
      ...state,
      total_unread: action.payload,
    };
  }

  return state;
};

export { chats, totalUnread };
