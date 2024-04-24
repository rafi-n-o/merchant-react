import { useSelector } from "react-redux";
import Gap from "../../../atoms/Gap";

const SectionPayment = () => {
  const { order } = useSelector((state) => state.order);

  return (
    <div className="card" style={styles.card}>
      <div style={styles.title}>
        <b>Rincian Pembayaran</b>
      </div>
      <Gap height={5} />
      <div style={styles.spaceBetween}>
        <div>Metode Pembayaran </div>
        <div>{order.paymentMethod}</div>
      </div>
      <div style={styles.spaceBetween}>
        <div>Total Berat</div>
        <div>{order.totalWeight}</div>
      </div>
      <hr />
      <div style={styles.spaceBetween}>
        <div>Harga ({order.totalItem})</div>
        <div>{order.totalPrice}</div>
      </div>
      <div style={styles.spaceBetween}>
        <div>Payment Tax</div>
        <div>{order.paymentTax}</div>
      </div>
      <div style={styles.spaceBetween}>
        <div>Service Fee</div>
        <div>{order.serviceFee}</div>
      </div>
      <div style={styles.spaceBetween}>
        <div>Ongkir</div>
        <div>{order.deliveryFee}</div>
      </div>
      <Gap height={5} />
      <div style={styles.spaceBetween}>
        <div>
          <b>Total Pembayaran</b>
        </div>
        <div>
          <b className="red-text">{order.grossAmount}</b>
        </div>
      </div>
    </div>
  );
};

export default SectionPayment;

const styles = {
  card: { padding: 10, borderRadius: 10 },
  title: { fontSize: 16 },
  spaceBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 16,
  },
};
