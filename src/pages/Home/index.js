import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { authentication } from "../../redux/action/auth";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token-merchant")) {
      window.location.href = "/login";
    }

    authentication()
      .then(() => {})
      .catch((err) => {
        window.location.href = "/login";
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <HashLoader color="#ff9100" style={styles.loading} />;
  }

  return (
    <div className="container">
      <div className="row" style={styles.row}>
        <Link to="/income" className="col s6 m4 l3 grey-text text-darken-3">
          <div className="card center" style={styles.card}>
            <i className="material-icons" style={styles.icon}>
              attach_money
            </i>
            <div style={styles.title}>Penghasilan</div>
          </div>
        </Link>
        <Link
          to="/order?status="
          className="col s6 m4 l3 grey-text text-darken-3"
        >
          <div className="card center" style={styles.card}>
            <i className="material-icons" style={styles.icon}>
              event_note
            </i>
            <div style={styles.title}>Pesanan</div>
          </div>
        </Link>
        <Link to="/product" className="col s6 m4 l3 grey-text text-darken-3">
          <div className="card center" style={styles.card}>
            <i className="material-icons" style={styles.icon}>
              settings
            </i>
            <div style={styles.title}>Produk</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;

const styles = {
  row: { marginLeft: -10, marginRight: -10 },
  card: { padding: 20, borderRadius: 10, fontSize: 20 },
  icon: { fontSize: 38 },
  title: { fontSize: 18 },
  loading: {},
};
