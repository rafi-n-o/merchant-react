import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import Gap from "../../../components/atoms/Gap";
import SectionItem from "../../../components/organisms/Order/Detail/SectionItem";
import SectionPayment from "../../../components/organisms/Order/Detail/SectionPayment";
import SectionShipping from "../../../components/organisms/Order/Detail/SectionShipping";
import SectionStatus from "../../../components/organisms/Order/Detail/SectionStatus";
import { authentication } from "../../../redux/action/auth";
import { getOrder } from "../../../redux/action/order";

const OrderDetail = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("token-merchant")) {
      window.location.href = "/login";
    }

    authentication()
      .then(() => {
        getOrder(id).then((res) => {
          dispatch({
            type: "GET_ORDER",
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
        <SectionStatus />
        <SectionItem />
        <SectionShipping />
        <SectionPayment />
        <Link to="/order" className="btn grey" style={styles.btn}>
          <i className="material-icons">arrow_back</i>
        </Link>
      </div>
      <Gap height={70} />
    </>
  );
};

export default OrderDetail;

const styles = {
  btn: { borderRadius: 10 },
  loading: {},
};
