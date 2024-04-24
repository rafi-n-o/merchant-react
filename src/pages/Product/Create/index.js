import M from "materialize-css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import Gap from "../../../components/atoms/Gap";
import { authentication } from "../../../redux/action/auth";
import { convertToBase64 } from "../../../redux/action/convertToBase64";
import { getFamilies } from "../../../redux/action/family";
import { getNeeds } from "../../../redux/action/need";
import { storeProduct } from "../../../redux/action/product";

const ProductCreate = () => {
  useEffect(() => {
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems, {});
  });

  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState("");
  const [needId, setNeedId] = useState("");
  const [familyId, setFamilyId] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [validation, setValidation] = useState([]);

  const { needs } = useSelector((state) => state.needs);
  const { families } = useSelector((state) => state.families);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("token-merchant")) {
      window.location.href = "/login";
    }

    authentication()
      .then(() => {
        getNeeds().then((res) => {
          dispatch({
            type: "GET_NEEDS",
            payload: res.data,
          });
        });
      })
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

  const selectNeed = (value) => {
    setLoading(true);
    setNeedId(value);
    getFamilies(value)
      .then((res) => {
        dispatch({
          type: "GET_FAMILIES",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const navigate = useNavigate();

  const formProduct = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = {
      needId: parseInt(needId),
      familyId: parseInt(familyId),
      image,
      name,
      description,
    };

    storeProduct(form)
      .then((res) => {
        toast(res.message);
        navigate(`/item/product/${res.data.id}`);
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
        <form className="card" onSubmit={formProduct} style={styles.card}>
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
            <select
              value={needId}
              onChange={(e) => {
                selectNeed(e.target.value);
              }}
            >
              <option value="" disabled>
                Pilih Kategori
              </option>
              {needs.map((value, index) => (
                <option value={value.id} key={index}>
                  {value.name}
                </option>
              ))}
            </select>
            <label>Kategori</label>
            {validation?.map((value, index) =>
              value.field === "needId" ? (
                <span className="helper-text red-text" key={index}>
                  {value.message}
                </span>
              ) : null
            )}
          </div>
          <div className="input-field">
            <select
              value={familyId}
              onChange={(e) => {
                setFamilyId(e.target.value);
              }}
            >
              <option value="" disabled>
                Pilih Sub Kategori
              </option>
              {families.map((value, index) => (
                <option value={value.id} key={index}>
                  {value.name}
                </option>
              ))}
            </select>
            <label>Sub Kategori</label>
            {validation?.map((value, index) =>
              value.field === "familyId" ? (
                <span className="helper-text red-text" key={index}>
                  {value.message}
                </span>
              ) : null
            )}
          </div>
          <div className="input-field">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="active">Deskripsi</label>
            {validation?.map((value, index) =>
              value.field === "description" ? (
                <span className="helper-text red-text" key={index}>
                  {value.message}
                </span>
              ) : null
            )}
          </div>
          <div style={styles.spaceBetween}>
            <Link to="/product" className="btn grey" style={styles.btn}>
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

export default ProductCreate;

const styles = {
  card: { padding: 10, borderRadius: 10 },
  image: { width: 70, height: 70 },
  btn: { borderRadius: 10 },
  spaceBetween: { display: "flex", justifyContent: "space-between" },
  loading: {},
};
