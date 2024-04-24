import { useSelector } from "react-redux";

const SectionStatus = () => {
  const { order } = useSelector((state) => state.order);

  return (
    <div className="card" style={styles.card}>
      <div style={styles.spaceBetween}>
        <div style={styles.status}>
          <b>{order.status}</b>
        </div>
        <div style={styles.id}>{order.id}</div>
      </div>
      <div style={styles.spaceBetween}>
        <div style={styles.dateTitle}>Tanggal Pembelian</div>
        <div style={styles.date}>{order.createdAt}</div>
      </div>
    </div>
  );
};

export default SectionStatus;

const styles = {
  card: { padding: 10, borderRadius: 10 },
  spaceBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  status: { fontSize: 14 },
  id: { fontSize: 14 },
  dateTitle: { fontSize: 15 },
  date: { fontSize: 14 },
};
