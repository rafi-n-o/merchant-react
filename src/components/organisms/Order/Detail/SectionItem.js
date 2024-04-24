import { useSelector } from "react-redux";
import Gap from "../../../atoms/Gap";

const SectionItem = () => {
  const { order } = useSelector((state) => state.order);

  return (
    <div className="card" style={styles.card}>
      <div style={styles.spaceBetween}>
        <div>
          <b>{order.merchant?.name}</b>
        </div>
        <div>{order.totalItem}</div>
      </div>
      <Gap height={10} />
      {order.OrderItems?.map((value, index) => (
        <>
          <div style={styles.containerItem} key={index}>
            <img
              src={`//${value.image}`}
              className="responsive-img"
              style={styles.image}
            />
            <div style={styles.containerProduct}>
              <div>{value.productName}</div>
              <div>{value.itemName}</div>
              <div style={styles.containerQuantity}>
                <div>{`${value.quantity} x ${value.price}`}</div>
              </div>
            </div>
          </div>
          <Gap height={10} />
        </>
      ))}
      <div style={styles.containerNote}>
        <div>Catatan:</div>
        <div>{order.note}</div>
      </div>
      <Gap height={10} />
    </div>
  );
};

export default SectionItem;

const styles = {
  card: { padding: 10, borderRadius: 10 },
  spaceBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 16,
  },
  containerItem: { display: "flex", alignItems: "center" },
  image: { width: 60, height: 60, marginRight: 10 },
  containerProduct: { fontSize: 16 },
  containerQuantity: { marginLeft: "auto" },
  containerNote: { fontSize: 16 },
};
