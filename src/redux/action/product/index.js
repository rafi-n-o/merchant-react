import Api from "../../../api/Api";

const getToken = () => {
  return localStorage.getItem("token-merchant");
};

const getProducts = () => {
  return new Promise((resolve, reject) => {
    Api.get("/merchant-products", { headers: { Authorization: getToken() } })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const getProduct = (id) => {
  return new Promise((resolve, reject) => {
    Api.get(`/merchant-products/${id}`, {
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

const storeProduct = (form) => {
  return new Promise((resolve, reject) => {
    Api.post("/merchant-products", form, {
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

const updateProduct = (id, form) => {
  return new Promise((resolve, reject) => {
    Api.put(`/merchant-products/${id}`, form, {
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

const destroyProduct = (id) => {
  return new Promise((resolve, reject) => {
    Api.delete(`/merchant-products/${id}`, {
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

export { destroyProduct, getProduct, getProducts, storeProduct, updateProduct };
