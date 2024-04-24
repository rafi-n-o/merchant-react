import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import Gap from "../../components/atoms/Gap";
import { authentication } from "../../redux/action/auth";
import { destroyProduct, getProducts } from "../../redux/action/product";

const Product = () => {
  const [loading, setLoading] = useState(true);

  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("token-merchant")) {
      window.location.href = "/login";
    }

    authentication()
      .then(() => {
        getProducts().then((res) => {
          dispatch({
            type: "GET_PRODUCTS",
            payload: res.data,
          });
        });
      })
      .catch((err) => {
        if (err.message === "invalid token") {
          window.location.href = "/login";
        } else {
          console.log(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const btnDelete = (id) => {
    setLoading(true);
    destroyProduct(id)
      .then((res) => {
        toast(res.message);
      })
      .then(() => {
        getProducts().then((res) => {
          dispatch({
            type: "GET_PRODUCTS",
            payload: res.data,
          });
        });
      })
      .catch((err) => {
        toast(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <HashLoader color="#ff9100" style={styles.loading} />;
  }

  return (
    <>
      <div className="container">
        <Gap height={10} />
        <div className="valign-wrapper">
          <Link to="/" className="btn grey" style={styles.btn}>
            <i className="material-icons">arrow_back</i>
          </Link>
          <Link to="/product/create" className="btn" style={styles.btn}>
            <i className="material-icons">add</i>
          </Link>
        </div>
        <Gap height={5} />
        {products.map((value, index) => (
          <div className="card" style={styles.card} key={index}>
            <Link to={`/item/product/${value.id}`} style={styles.flex}>
              <img
                src={`//${value.image}`}
                className="responsive-img"
                style={styles.image}
              />
              <div className="grey-text text-darken-3" style={styles.name}>
                {value.name}
              </div>
            </Link>
            <div style={styles.right}>
              <div style={styles.flex}>
                <Link
                  to={`/product/${value.id}/update`}
                  className="btn orange"
                  style={styles.btn}
                >
                  <i className="material-icons">edit</i>
                </Link>
                <button
                  className="btn red"
                  onClick={() => btnDelete(value.id)}
                  style={styles.btn}
                >
                  <i className="material-icons">delete</i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Gap height={70} />
    </>
  );
};

export default Product;

const styles = {
  btn: { borderRadius: 10, marginRight: 2 },
  card: {
    padding: 10,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  image: { width: 70, height: 70, marginRight: 10 },
  name: { fontSize: 16 },
  right: { marginLeft: "auto", marginRight: -2 },
  loading: {},
};
