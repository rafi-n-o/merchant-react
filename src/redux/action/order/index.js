import Api from "../../../api/Api";

const getToken = () => {
  return localStorage.getItem("token-merchant");
};

const getOrders = (status = "") => {
  return new Promise((resolve, reject) => {
    Api.get(`/merchant-orders?status=${status}`, {
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

const getOrder = (id) => (dispatch) => {
  Api.get(`/merchant-orders/${id}`, {
    headers: { Authorization: getToken() },
  })
    .then((res) => {
      dispatch({
        type: "GET_ORDER",
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

const packing = (id) => {
  return new Promise((resolve, reject) => {
    Api.put(
      `/merchant-orders/${id}/packing`,
      {},
      {
        headers: { Authorization: getToken() },
      }
    )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const getIncome = (status, startDate = "", endDate = "") => {
  return new Promise((resolve, reject) => {
    Api.get(
      `/merchant-orders/income?status=${status}&startDate=${startDate}&endDate=${endDate}`,
      {
        headers: { Authorization: getToken() },
      }
    )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export { getOrders, getOrder, packing, getIncome };
