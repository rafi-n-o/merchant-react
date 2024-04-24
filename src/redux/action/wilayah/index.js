import Api from "../../../api/Api";

const getWilayah = (provinceId, regencyId, districtId) => {
  if (provinceId) {
    return new Promise((resolve, reject) => {
      Api.get(`/wilayah?provinceId=${provinceId}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  }

  if (regencyId) {
    return new Promise((resolve, reject) => {
      Api.get(`/wilayah?regencyId=${regencyId}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  }

  if (districtId) {
    return new Promise((resolve, reject) => {
      Api.get(`/wilayah?districtId=${districtId}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  }

  return new Promise((resolve, reject) => {
    Api.get(`/wilayah`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export { getWilayah };
