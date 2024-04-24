import { useSelector } from "react-redux";
import Gap from "../../../atoms/Gap";

const SectionShipping = () => {
  const { order } = useSelector((state) => state.order);

  return (
    <div className="card" style={styles.card}>
      <div style={styles.title}>
        <b>Informasi Pengiriman</b>
      </div>
      <Gap height={5} />
      <div style={styles.flex}>
        <div style={styles.title}>Driver</div>
        <div style={styles.driver}>
          <div>{order.Driver?.name}</div>
          <div>{order.Driver?.phone}</div>
        </div>
      </div>
      <Gap height={10} />
      <div style={styles.flex}>
        <div style={styles.title}>Alamat</div>
        <div style={styles.address}>
          <div>{order.customer?.name}</div>
          <div>{order.customer?.phone}</div>
          <div>
            {order.customer?.address}, {order.customer?.village},{" "}
            {order.customer?.district}, {order.customer?.regency},{" "}
            {order.customer?.province}, {order.customer?.zipCode}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionShipping;

const styles = {
  card: { padding: 10, borderRadius: 10 },
  title: { fontSize: 16 },
  flex: {
    display: "flex",
  },
  driver: { marginLeft: 23, fontSize: 16 },
  address: { marginLeft: 15, fontSize: 16 },
};
