import Api from "../../../api/Api";

const getNeeds = () => {
  return new Promise((resolve, reject) => {
    Api.get("/merchant-needs")
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export { getNeeds };
