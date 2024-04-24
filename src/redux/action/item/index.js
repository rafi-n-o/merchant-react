import Api from "../../../api/Api";

const getToken = () => {
  return localStorage.getItem("token-merchant");
};

const getItems = (id) => {
  return new Promise((resolve, reject) => {
    Api.get(`/merchant-items?productId=${id}`, {
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

const getItem = (id) => {
  return new Promise((resolve, reject) => {
    Api.get(`/merchant-items/${id}`, {
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

const storeItem = (form) => {
  return new Promise((resolve, reject) => {
    Api.post(`/merchant-items`, form, {
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

const updateItem = (id, form) => {
  return new Promise((resolve, reject) => {
    Api.put(`/merchant-items/${id}`, form, {
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

const destroyItem = (id) => {
  return new Promise((resolve, reject) => {
    Api.delete(`/merchant-items/${id}`, {
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

export { getItems, getItem, storeItem, updateItem, destroyItem };
