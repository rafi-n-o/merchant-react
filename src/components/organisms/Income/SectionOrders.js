import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Gap from "../../atoms/Gap";

const SectionOrders = ({ status }) => {
  const { income } = useSelector((state) => state.income);

  return (
    <div className="card" style={styles.card}>
      <div style={styles.title}>Rincian</div>
      <Gap height={10} />
      {income.Orders?.map((value, index) => (
        <Link to={`/order/${value.id}`} style={styles.spaceBetween} key={index}>
          <div style={styles.id}>{value.id}</div>
          <div style={styles.totalPrice}>{value.totalPrice}</div>
        </Link>
      ))}
    </div>
  );
};

export default SectionOrders;

const styles = {
  card: { padding: 10, borderRadius: 10 },
  title: {
    fontSize: 16,
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
  },
  id: {
    fontSize: 16,
    marginRight: 10,
  },
  totalPrice: {
    fontSize: 16,
  },
};
