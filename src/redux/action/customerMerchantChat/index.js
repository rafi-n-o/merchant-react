import Api from "../../../api/Api";

const getToken = () => {
  return localStorage.getItem("token-merchant");
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    Api.get("/merchant-customer-chats", {
      headers: { Authorization: getToken() },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const storeChat = (customerId, form) => {
  return new Promise((resolve, reject) => {
    Api.post(`/merchant-customer-chats/customers/${customerId}`, form, {
      headers: { Authorization: getToken() },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const getChats = (customerId) => {
  return new Promise((resolve, reject) => {
    Api.get(`/merchant-customer-chats/customers/${customerId}`, {
      headers: { Authorization: getToken() },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const getTotalUnread = () => (dispatch) => {
  Api.get("/merchant-customer-chats/total-unread", {
    headers: { Authorization: getToken() },
  })
    .then((res) => {
      dispatch({
        type: "GET_TOTAL_UNREAD",
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export { getAll, getChats, getTotalUnread, storeChat };
