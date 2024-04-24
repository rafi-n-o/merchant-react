import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { packing } from "../../../redux/action/order";
import Gap from "../../atoms/Gap";
import { useState } from "react";
import { HashLoader } from "react-spinners";

const SectionOrder = () => {
  const [loading, setLoading] = useState(false);

  const { orders } = useSelector((state) => state.orders);

  const btnPacking = (id) => {
    setLoading(true);
    packing(id)
      .then((res) => {
        toast(res.message);
        window.location.href = "/order?status=packing";
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
      {orders.map((value, index) => (
        <div
          className="card grey-text text-darken-3"
          style={styles.card}
          key={index}
        >
          <Link to={`/order/${value.id}`} className="grey-text text-darken-3">
            <div style={styles.spaceBetween}>
              <div>{value.id}</div>
              <div style={styles.date}>{value.createdAt}</div>
            </div>
            <div style={styles.spaceBetween}>
              <div>
                <b>{value.merchant.name}</b>
              </div>
              <div>{value.totalItem}</div>
            </div>
            <Gap height={10} />
            {value.OrderItems.map((v, i) => (
              <>
                <div style={styles.containerItem} key={i}>
                  <div style={styles.containerImage}>
                    <img
                      src={`//${v.image}`}
                      className="responsive-img"
                      style={styles.image}
                    />
                  </div>
                  <div style={styles.containerProduct}>
                    <div>{v.productName}</div>
                    <div>{v.itemName}</div>
                  </div>
                  <div style={styles.containerQuantity}>
                    <div>{v.quantity}</div>
                  </div>
                </div>
                <Gap height={10} />
              </>
            ))}
            <div style={styles.containerNote}>
              <div>Catatan:</div>
              <div>{value.note}</div>
            </div>
            <Gap height={5} />
            <div style={styles.containerStatus}>
              <b>{value.status}</b>
            </div>
            <div style={styles.spaceBetween}>
              <div>Metode Pembayaran</div>
              <div>{value.paymentMethod}</div>
            </div>
            <div style={styles.spaceBetween}>
              <div>
                <b>Total Pembayaran</b>
              </div>
              <div className="red-text">
                <b>{value.grossAmount}</b>
              </div>
            </div>
          </Link>
          <Gap height={10} />
          <div style={styles.containerBtn}>
            {(() => {
              if (value.rawStatus === "success") {
                return (
                  <>
                    <button
                      className="btn green"
                      onClick={() => btnPacking(value.id)}
                      style={styles.btn}
                    >
                      Kemas Sekarang
                    </button>
                  </>
                );
              }
            })()}
          </div>
        </div>
      ))}
    </>
  );
};

export default SectionOrder;

const styles = {
  card: { padding: 10, borderRadius: 10 },
  spaceBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 16,
  },
  date: { fontSize: 14 },
  containerItem: { display: "flex", alignItems: "center" },
  image: { width: 60, height: 60, marginRight: 10 },
  containerProduct: { fontSize: 16 },
  containerQuantity: { marginLeft: "auto", fontSize: 16 },
  containerNote: { fontSize: 16 },
  containerStatus: { display: "flex", justifyContent: "end", fontSize: 16 },
  containerBtn: { display: "flex", justifyContent: "end" },
  btn: { borderRadius: 10, marginLeft: 2 },
  loading: {},
};
