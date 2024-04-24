import { useSelector } from "react-redux";

const SectionAttach = ({ productId, orderId }) => {
  const { product } = useSelector((state) => state.product);
  const { order } = useSelector((state) => state.order);

  return (
    <>
      {(() => {
        if (productId)
          return (
            <div className="card" style={styles.card}>
              <div style={styles.flex}>
                <img
                  src={`//${product.image}`}
                  className="responsive-img"
                  style={styles.image}
                />
                <div>
                  <div style={styles.productName}>{product.name}</div>
                  <div className="red-text" style={styles.price}>
                    {product.price}
                  </div>
                </div>
              </div>
            </div>
          );
        if (orderId)
          return (
            <div className="card" style={styles.card}>
              <div style={styles.flex}>
                <div style={styles.orderId}>{order.id}</div>
              </div>
            </div>
          );
      })()}
    </>
  );
};

export default SectionAttach;

const styles = {
  card: { padding: 10 },
  flex: { display: "flex", alignItems: "center" },
  image: { width: 60, height: 60, marginRight: 10 },
  productName: { fontSize: 16 },
  price: { fontSize: 16 },
  orderId: { fontSize: 16 },
};
