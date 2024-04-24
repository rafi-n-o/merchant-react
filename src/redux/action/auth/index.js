import Api from "../../../api/Api";

const getToken = () => {
  return localStorage.getItem("token-merchant");
};

const storeRegister = (form) => {
  return new Promise((resolve, reject) => {
    Api.post("/merchant-merchants", form)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const storeLogin = (form) => {
  return new Promise((resolve, reject) => {
    Api.post("/merchant-merchants/login", form)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

const authentication = () => {
  return new Promise((resolve, reject) => {
    Api.get("/merchant-merchants", {
      headers: {
        Authorization: getToken(),
      },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export { storeRegister, storeLogin, authentication };
