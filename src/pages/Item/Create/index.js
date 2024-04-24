import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import Gap from "../../../components/atoms/Gap";
import { authentication } from "../../../redux/action/auth";
import { convertToBase64 } from "../../../redux/action/convertToBase64";
import { storeItem } from "../../../redux/action/item";

const ItemCreate = () => {
  const { productId } = useParams();

  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");
  const [validation, setValidation] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token-merchant")) {
      window.location.href = "/login";
    }

    authentication()
      .then(() => {})
      .catch((err) => {
        if (err.message === "invalid token") {
          window.location.href = "/login";
        } else {
          console.log(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handlePreviewImage = (e) => {
    const [file] = e.target.files;

    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));
  };

  const handleFileUpload = async (e) => {
    const [file] = e.target.files;

    if (!file) return;

    const { size, type } = file;

    if (type !== "image/jpg" && type !== "image/jpeg" && type !== "image/png") {
      toast("Tipe yang diperbolehkan hanya jpg, jpeg, & png");
      setImage();
    } else if (size > 1000000) {
      toast("Ukuran gambar maksimal 1 mb");
      setImage();
    } else {
      setImage(await convertToBase64(file));
    }
  };

  const navigate = useNavigate();

  const formItem = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = {
      productId,
      image,
      name,
      price: parseInt(price),
      weight: parseInt(weight),
      discount: parseInt(discount),
      stock: parseInt(stock),
    };

    storeItem(form)
      .then((res) => {
        toast(res.message);
        navigate(`/item/product/${productId}`);
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
    <>
      <div className="container">
        <form className="card" onSubmit={formItem} style={styles.card}>
          <img
            src={previewImage}
            className="responsive-img"
            style={styles.image}
          />
          <div className="file-field input-field">
            <div className="btn" style={styles.btn}>
              <i className="material-icons">image</i>
              <input
                type="file"
                onChange={(e) => {
                  handlePreviewImage(e);
                  handleFileUpload(e);
                }}
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
            {validation?.map((value, index) =>
              value.field === "image" ? (
                <span className="helper-text red-text" key={index}>
                  {value.message}
                </span>
              ) : null
            )}
          </div>
          <div className="input-field">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="active">Nama</label>
            {validation?.map((value, index) =>
              value.field === "name" ? (
                <span className="helper-text red-text" key={index}>
                  {value.message}
                </span>
              ) : null
            )}
          </div>
          <div className="input-field">
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label className="active">Harga</label>
            {validation?.map((value, index) =>
              value.field === "price" ? (
                <span className="helper-text red-text" key={index}>
                  {value.message}
                </span>
              ) : null
            )}
          </div>
          <div className="input-field">
            <input
              type="text"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <label className="active">Stok</label>
            {validation?.map((value, index) =>
              value.field === "stock" ? (
                <span className="helper-text red-text" key={index}>
                  {value.message}
                </span>
              ) : null
            )}
          </div>
          <div className="input-field">
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <label className="active">Berat (gram)</label>
            {validation?.map((value, index) =>
              value.field === "weight" ? (
                <span className="helper-text red-text" key={index}>
                  {value.message}
                </span>
              ) : null
            )}
          </div>
          <div className="input-field">
            <input
              type="text"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <label className="active">Diskon (persen)</label>
            {validation?.map((value, index) =>
              value.field === "discount" ? (
                <span className="helper-text red-text" key={index}>
                  {value.message}
                </span>
              ) : null
            )}
          </div>
          <div style={styles.spaceBetween}>
            <Link
              to={`/item/product/${productId}`}
              className="btn grey"
              style={styles.btn}
            >
              <i className="material-icons">arrow_back</i>
            </Link>
            <button className="btn" style={styles.btn}>
              <i className="material-icons">save</i>
            </button>
          </div>
        </form>
      </div>
      <Gap height={70} />
    </>
  );
};

export default ItemCreate;

const styles = {
  card: { padding: 10, borderRadius: 10 },
  image: { width: 70, height: 70 },
  btn: { borderRadius: 10 },
  spaceBetween: { display: "flex", justifyContent: "space-between" },
  loading: {},
};
