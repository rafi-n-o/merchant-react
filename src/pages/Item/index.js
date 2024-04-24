import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import Gap from "../../components/atoms/Gap";
import { authentication } from "../../redux/action/auth";
import { destroyItem, getItems } from "../../redux/action/item";

const Item = () => {
  const { productId } = useParams();

  const [loading, setLoading] = useState(true);

  const { items } = useSelector((state) => state.items);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("token-merchant")) {
      window.location.href = "/login";
    }

    authentication()
      .then(() => {
        getItems(productId)
          .then((res) => {
            dispatch({
              type: "GET_ITEMS",
              payload: res.data,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        window.location.href = "/login";
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const btnDelete = (id) => {
    setLoading(true);
    destroyItem(id)
      .then((res) => {
        toast(res.message);
      })
      .then(() => {
        getItems(productId)
          .then((res) => {
            dispatch({
              type: "GET_ITEMS",
              payload: res.data,
            });
          })
          .catch((err) => {
            console.log(err);
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
          <Link to="/product" className="btn grey" style={styles.btn}>
            <i className="material-icons">arrow_back</i>
          </Link>
          <Link
            to={`/item/product/${productId}/create`}
            className="btn"
            style={styles.btn}
          >
            <i className="material-icons">add</i>
          </Link>
        </div>
        <Gap height={5} />
        <div style={styles.product}>{items[0]?.Product.name}</div>
        {(() => {
          if (!items.length) {
            return (
              <div className="card" style={styles.card}>
                Silahkan tambahkan varian produk...
              </div>
            );
          }
        })()}
        {items.map((value, index) => (
          <div className="card" style={styles.card} key={index}>
            <div style={styles.flex}>
              <img
                src={`//${value.image}`}
                className="responsive-img"
                style={styles.image}
              />
              <div style={styles.item}>
                <div>{value.name}</div>
                <div>Stok : {value.stock}</div>
                <div>Berat : {value.weight}</div>
                <div>
                  <s>{value.price}</s>
                </div>
                <div className="red-text">
                  <b>{value.priceWithDiscount}</b>
                </div>
              </div>
            </div>
            <div style={styles.right}>
              <div style={styles.flex}>
                <Link
                  to={`/item/${value.id}/update`}
                  className="btn orange"
                  style={styles.btn}
                >
                  <i className="material-icons">edit</i>
                </Link>
                <button
                  className="btn red"
                  style={styles.btn}
                  onClick={() => btnDelete(value.id)}
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

export default Item;

const styles = {
  btn: { borderRadius: 10, marginRight: 2 },
  product: { fontSize: 16 },
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
  item: { fontSize: 16 },
  right: { marginLeft: "auto", marginRight: -2 },
  loading: {},
};
