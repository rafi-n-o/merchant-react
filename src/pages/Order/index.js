import M from "materialize-css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import Gap from "../../components/atoms/Gap";
import SectionFilter from "../../components/organisms/Order/SectionFilter";
import SectionOrder from "../../components/organisms/Order/SectionOrder";
import { authentication } from "../../redux/action/auth";
import { getOrders } from "../../redux/action/order";

const Order = () => {
  useEffect(() => {
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems, {});
  });

  let [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("token-merchant")) {
      window.location.href = "/login";
    }

    authentication()
      .then(() => {
        getOrders(status).then((res) => {
          dispatch({
            type: "GET_ORDERS",
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

  if (loading) {
    return <HashLoader color="#ff9100" style={styles.loading} />;
  }

  return (
    <>
      <div className="container">
        <SectionFilter status={status} />
        <SectionOrder />
        <Link to="/" className="btn grey" style={styles.btn}>
          <i className="material-icons">arrow_back</i>
        </Link>
      </div>
      <Gap height={70} />
    </>
  );
};

export default Order;

const styles = {
  btn: { borderRadius: 10 },
  loading: {},
};
