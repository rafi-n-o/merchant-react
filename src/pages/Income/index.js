import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import SectionAmount from "../../components/organisms/Income/SectionAmount";
import SectionFilter from "../../components/organisms/Income/SectionFilter";
import SectionOrders from "../../components/organisms/Income/SectionOrders";
import { authentication } from "../../redux/action/auth";
import { getIncome } from "../../redux/action/order";

const Income = () => {
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
        getIncome(status ? status : "").then((res) => {
          dispatch({
            type: "GET_INCOME",
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
        <SectionAmount status={status} />
        <SectionOrders />
        <Link to="/" className="btn grey" style={styles.btn}>
          <i className="material-icons">arrow_back</i>
        </Link>
      </div>
    </>
  );
};

export default Income;

const styles = {
  btn: { borderRadius: 10 },
  loading: {},
};
