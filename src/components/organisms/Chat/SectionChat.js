import Gap from "../../atoms/Gap";

const SectionChat = ({ chats }) => {
  return (
    <>
      {chats.map((value, index) => {
        if (value.sender === "customer")
          return (
            <>
              <div style={styles.flexCustomer} key={index}>
                <div style={styles.clear}>
                  {(() => {
                    if (value.Product)
                      return (
                        <div className="card" style={styles.cardProduct}>
                          <img
                            src={`//${value.Product.image}`}
                            style={styles.productImage}
                          />
                          <div style={styles.productName}>
                            {value.Product.name}
                          </div>
                        </div>
                      );

                    if (value.orderId)
                      return (
                        <div className="card" style={styles.card}>
                          <a
                            href={`/order/${value.orderId}`}
                            style={styles.orderId}
                          >
                            {value.orderId}
                          </a>
                        </div>
                      );
                  })()}
                </div>
              </div>
              <div style={styles.flexCustomer}>
                <div className="card" style={styles.card}>
                  <div style={styles.message}>{value.message}</div>
                  <Gap height={5} />
                  <div style={styles.isRead}>
                    {value.isRead ? (
                      <b className="green-text">✓✓</b>
                    ) : (
                      <b className="grey-text text-darken-3">✓</b>
                    )}{" "}
                    {value.createdAt}
                  </div>
                </div>
              </div>
            </>
          );

        if (value.sender === "merchant")
          return (
            <div style={styles.flexMerchant} key={index}>
              <div className="card" style={styles.card}>
                <div style={styles.message}>{value.message}</div>
                <Gap height={5} />
                <div style={styles.isRead}>
                  {value.createdAt}{" "}
                  {value.isRead ? (
                    <b className="green-text">✓✓</b>
                  ) : (
                    <b className="grey-text text-darken-3">✓</b>
                  )}
                </div>
              </div>
            </div>
          );
      })}
    </>
  );
};

export default SectionChat;

const styles = {
  flexCustomer: { display: "flex", justifyContent: "end" },
  clear: { clear: "both" },
  flexMerchant: { display: "flex", justifyContent: "start" },
  cardProduct: { display: "flex", alignItems: "center", padding: 10 },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 5,
  },
  productName: {
    fontSize: 16,
  },
  card: {
    padding: 10,
  },
  orderId: {
    fontSize: 16,
  },
  message: {
    fontSize: 15,
  },
  isRead: { fontSize: 10 },
};
