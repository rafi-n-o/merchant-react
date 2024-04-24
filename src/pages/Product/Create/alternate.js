import M from "materialize-css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token-merchant")) {
      authentication()
        .then((res) => {
          dispatch({
            type: "GET_USER",
            payload: res.data,
          });
        })
        .catch((err) => {
          window.location.href = "/login";
        });
    } else {
      window.location.href = "/login";
    }
    dispatch(getNeeds());
  }, []);

  const { needs } = useSelector((state) => state.needs);
  const { families } = useSelector((state) => state.families);

  const [needId, setNeedId] = useState();
  const [familyId, setFamilyId] = useState();
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [validation, setValidation] = useState([]);
  const [items, setItems] = useState([]);
  const [previewImage, setPreviewImage] = useState();
  const [validationItems, setValidationItems] = useState([]);

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
      alert("Tipe yang diperbolehkan hanya jpg, jpeg, & png");
      setImage();
    } else if (size > 1000000) {
      alert("Ukuran gambar maksimal 1 mb");
      setImage();
    } else {
      setImage(await convertToBase64(file));
    }
  };

  const addItem = () => {
    let newItem = {
      image: "",
      name: "",
      price: "",
      stock: "",
      weight: "",
      discount: "",
    };

    setItems([...items, newItem]);
  };

  const handleFormItem = async (index, e) => {
    let data = [...items];

    if (e.target.name === "image") {
      const [file] = e.target.files;

      if (!file) return;

      const { size, type } = file;

      if (
        type !== "image/jpg" &&
        type !== "image/jpeg" &&
        type !== "image/png"
      ) {
        alert("Tipe yang diperbolehkan hanya jpg, jpeg, & png");
        data[index][e.target.name] = "";
        setItems(data);
      } else if (size > 1000000) {
        alert("Ukuran gambar maksimal 1 mb");
        data[index][e.target.name] = "";
        setItems(data);
      } else {
        const image = await convertToBase64(file);
        data[index][e.target.name] = image;
        setItems(data);
      }
    }

    if (e.target.name === "name") {
      data[index][e.target.name] = e.target.value;
      setItems(data);
    }

    if (e.target.name === "price") {
      const price = parseInt(e.target.value);
      data[index][e.target.name] = price;
      setItems(data);
    }

    if (e.target.name === "weight") {
      const weight = parseInt(e.target.value);
      data[index][e.target.name] = weight;
      setItems(data);
    }

    if (e.target.name === "stock") {
      const stock = parseInt(e.target.value);
      data[index][e.target.name] = stock;
      setItems(data);
    }

    if (e.target.name === "discount") {
      const discount = parseInt(e.target.value);
      data[index][e.target.name] = discount;
      setItems(data);
    }
  };

  const removeItem = (index) => {
    let data = [...items];
    data.splice(index, 1);
    setItems(data);
  };

  const navigate = useNavigate();

  const formProduct = (e) => {
    e.preventDefault();

    const form = {
      needId: parseInt(needId),
      familyId: parseInt(familyId),
      image,
      name,
      description,
      items,
    };

    storeProduct(form)
      .then((res) => {
        alert(res.message);
        navigate("/product");
      })
      .catch((err) => {
        if (err.message === "validation failed") {
          setValidation(err.data);
        } else if (err.message === "validation add item failed") {
          setValidation([]);
          alert("Lengkapi varian terlebih dahulu! minimal 1 varian!");
        } else if (err.message === "validation item failed") {
          setValidation([]);
          setValidationItems(err.data);
        } else {
          alert(err.message);
        }
      });
  };

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
            <div className="btn">
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
            <label>Nama</label>
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
              onChange={(e) => {
                setNeedId(e.target.value);
                dispatch(getFamilies(e.target.value));
              }}
            >
              <option value="" selected disabled>
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
              value.field === "need" ? (
                <span className="helper-text red-text" key={index}>
                  {value.message}
                </span>
              ) : null
            )}
          </div>
          <div className="input-field">
            <select
              onChange={(e) => {
                setFamilyId(e.target.value);
              }}
            >
              <option value="" selected disabled>
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
              value.field === "family" ? (
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
            <label>Deskripsi</label>
            {validation?.map((value, index) =>
              value.field === "description" ? (
                <span className="helper-text red-text" key={index}>
                  {value.message}
                </span>
              ) : null
            )}
          </div>
          <div className="row">
            {items.map((input, index) => (
              <div
                className="card grey lighten-5 col"
                key={index}
                style={styles.card}
              >
                <a
                  href="#"
                  className="red-text"
                  onClick={() => removeItem(index)}
                  style={styles.btnItem}
                >
                  Hapus Varian
                </a>
                <div className="file-field input-field col s12">
                  <div className="btn">
                    <i className="material-icons">image</i>
                    <input
                      type="file"
                      name="image"
                      onChange={(e) => handleFormItem(index, e)}
                    />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                  </div>
                  {validationItems.index === index ? (
                    <>
                      {validationItems.validate.map((value, index) =>
                        value.field === "image" ? (
                          <span className="helper-text red-text" key={index}>
                            {value.message}
                          </span>
                        ) : null
                      )}
                    </>
                  ) : null}
                </div>
                <div className="input-field col s6 l3">
                  <input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={(e) => handleFormItem(index, e)}
                  />
                  <label>Varian</label>
                  {validationItems.index === index ? (
                    <>
                      {validationItems.validate.map((value, index) =>
                        value.field === "name" ? (
                          <span className="helper-text red-text" key={index}>
                            {value.message}
                          </span>
                        ) : null
                      )}
                    </>
                  ) : null}
                </div>
                <div className="input-field col s6 l3">
                  <input
                    type="number"
                    name="price"
                    value={input.price}
                    onChange={(e) => handleFormItem(index, e)}
                  />
                  <label>Harga</label>
                  {validationItems.index === index ? (
                    <>
                      {validationItems.validate.map((value, index) =>
                        value.field === "price" ? (
                          <span className="helper-text red-text" key={index}>
                            {value.message}
                          </span>
                        ) : null
                      )}
                    </>
                  ) : null}
                </div>
                <div className="input-field col s6 l3">
                  <input
                    type="number"
                    name="weight"
                    value={input.weight}
                    onChange={(e) => handleFormItem(index, e)}
                  />
                  <label>Berat (gram)</label>
                  {validationItems.index === index ? (
                    <>
                      {validationItems.validate.map((value, index) =>
                        value.field === "weight" ? (
                          <span className="helper-text red-text" key={index}>
                            {value.message}
                          </span>
                        ) : null
                      )}
                    </>
                  ) : null}
                </div>
                <div className="input-field col s6 l3">
                  <input
                    type="number"
                    name="stock"
                    value={input.stock}
                    onChange={(e) => handleFormItem(index, e)}
                  />
                  <label>Stok</label>
                  {validationItems.index === index ? (
                    <>
                      {validationItems.validate.map((value, index) =>
                        value.field === "stock" ? (
                          <span className="helper-text red-text" key={index}>
                            {value.message}
                          </span>
                        ) : null
                      )}
                    </>
                  ) : null}
                </div>

                <div className="input-field col s6 l3">
                  <input
                    type="number"
                    name="discount"
                    value={input.discount}
                    onChange={(e) => handleFormItem(index, e)}
                  />
                  <label>Diskon (persen)</label>
                </div>
              </div>
            ))}
          </div>
          <a href="#" onClick={addItem} style={styles.btnItem}>
            Tambah Varian
          </a>

          <div style={styles.containerBtn}>
            <button className="btn">
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
  image: { width: 75, height: 75 },
  containerBtn: { display: "flex", justifyContent: "end" },
  btnItem: { fontSize: 16 },
};
