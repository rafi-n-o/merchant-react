import Api from "../../../api/Api";

const getFamilies = (needId) => {
  return new Promise((resolve, reject) => {
    Api.get(`/merchant-families/needs/${needId}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export { getFamilies };
