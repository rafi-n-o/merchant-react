import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import Gap from "../../components/atoms/Gap";
import { authentication, storeLogin } from "../../redux/action/auth";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [validation, setValidation] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token-merchant")) {
      authentication()
        .then(() => {
          window.location.href = "/";
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setLoading(false);
  }, []);

  const navigate = useNavigate();

  const formLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = {
      phone,
      pin,
    };

    storeLogin(form)
      .then((res) => {
        localStorage.setItem("token-merchant", res.data);
        toast(res.message);
        navigate("/");
      })
      .catch((err) => {
        if (err.message === "validation failed") {
          setValidation(err.data);
        } else {
          toast(err.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <HashLoader color="#ff9100" style={styles.loading} />;
  }

  return (
    <div className="container">
      <form onSubmit={formLogin}>
        <div className="card" style={styles.card}>
          <div className="center" style={styles.title}>
            Sign In
          </div>
          <div className="input-field">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label className="active">No. Telp</label>
            {validation?.map((value, index) =>
              value.field === "phone" ? (
                <span className="helper-text red-text" key={index}>
                  {value.message}
                </span>
              ) : null
            )}
          </div>
          <div className="input-field">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <label className="active">Pin (6 digit angka)</label>
            {validation?.map((value, index) =>
              value.field === "pin" ? (
                <span className="helper-text red-text" key={index}>
                  {value.message}
                </span>
              ) : null
            )}
          </div>
          <div className="input-field center">
            <button className="btn-large">Masuk</button>
            <Gap height={5} />
            <div>
              <Link to="/register" style={styles.link}>
                Belum punya akun? Daftar disini!
              </Link>
            </div>
          </div>
          <Gap height={10} />
        </div>
      </form>
    </div>
  );
};

export default Login;

const styles = {
  card: { padding: 10, borderRadius: 10 },
  title: { fontSize: 22 },
  link: { fontSize: 16 },
  loading: {},
};
