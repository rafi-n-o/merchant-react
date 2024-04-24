import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authentication } from "../../redux/action/auth";
import { getAll } from "../../redux/action/customerMerchantChat";
import { HashLoader } from "react-spinners";

const Chat = () => {
  const [loading, setLoading] = useState(true);

  const { customers } = useSelector((state) => state.customers);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("token-merchant")) {
      window.location.href = "/login";
    }

    authentication()
      .then(() => {
        getAll().then((res) => {
          dispatch({
            type: "GET_CUSTOMERS",
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
        {customers.map((value, index) => (
          <a
            href={`/chat/customer/${value.customerId}`}
            className="grey-text text-darken-3"
            key={index}
          >
            <div className="card" style={styles.card}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                key={index}
              >
                <img
                  src={`//${value.image}`}
                  className="responsive-img"
                  style={styles.image}
                />
                <div style={styles.customer}>
                  {value.Customer?.name}{" "}
                  {value.unread ? (
                    <b className="red-text">({value.unread})</b>
                  ) : null}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
};

export default Chat;

const styles = {
  card: { padding: 10, borderRadius: 10 },
  image: { width: 50, height: 50, marginRight: 10 },
  customer: { fontSize: 16 },
  loading: {},
};
