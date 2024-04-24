import "leaflet/dist/leaflet.css";
import M from "materialize-css";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader, PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import Gap from "../../components/atoms/Gap";
import { authentication, storeRegister } from "../../redux/action/auth";
import { getWilayah } from "../../redux/action/wilayah";

const Register = () => {
  useEffect(() => {
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems, {});
  });

  const [loading, setLoading] = useState(true);
  const [districtLoading, setDistrictLoading] = useState(false);
  const [villageLoading, setVillageLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("JAWA BARAT");
  const [regency, setRegency] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [pin, setPin] = useState("");
  const [pinConfirmation, setPinConfirmation] = useState("");
  const [validation, setValidation] = useState([]);
  const [position, setPosition] = useState(null);
  const mapRef = useRef(null);

  const { districts } = useSelector((state) => state.districts);
  const { villages } = useSelector((state) => state.villages);

  const defaultLatitude = -7.047592468597611;
  const defauktLongitude = 107.58868235131465;

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

    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  }, []);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
        setPosition(e.latlng);
      },
    });

    return position === null ? null : <Marker position={position} />;
  };

  const dispatch = useDispatch();

  const selectRegency = (value) => {
    setDistrictLoading(true);
    setRegency(value);
    const obj = JSON.parse(value);
    getWilayah("", obj.id, "")
      .then((res) => {
        dispatch({
          type: "GET_DISTRICTS",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setDistrictLoading(false);
      });
  };

  const selectDistrict = (value) => {
    setVillageLoading(true);
    setDistrict(value);
    const obj = JSON.parse(value);
    getWilayah("", "", obj.id)
      .then((res) => {
        dispatch({
          type: "GET_VILLAGES",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setVillageLoading(false);
      });
  };

  const selectVillage = (value) => {
    setVillage(value);
  };

  const navigate = useNavigate();

  const formRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = {
      name,
      email,
      phone,
      province,
      regency,
      district,
      village,
      zipCode,
      address,
      latitude,
      longitude,
      pin,
      pin_confirmation: pinConfirmation,
    };

    storeRegister(form)
      .then((res) => {
        toast(res.message);
        navigate("/login");
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
      <form onSubmit={formRegister}>
        <div className="card" style={styles.card}>
          <div className="center" style={styles.title}>
            Registrasi
          </div>
          <div className="input-field">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="active">Nama Merchant</label>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="active">Email (boleh dikosongkan)</label>
            {validation?.map((value, index) =>
              value.field === "email" ? (
                <span className="helper-text red-text" key={index}>
                  {value.message}
                </span>
              ) : null
            )}
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
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label className="active">Alamat</label>
            {validation?.map((value, index) =>
              value.field === "address" ? (
                <span className="helper-text red-text" key={index}>
                  {value.message}
                </span>
              ) : null
            )}
          </div>
          <div className="input-field">
            <input
              type="text"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              disabled
            />
            <label className="active">Provinsi</label>
            {validation?.map((value, index) =>
              value.field === "province" ? (
                <span className="helper-text red-text" key={index}>
                  {value.message}
                </span>
              ) : null
            )}
          </div>
          <div className="input-field">
            <select
              value={regency}
              onChange={(e) => {
                selectRegency(e.target.value);
              }}
            >
              <option value="" disabled>
                Pilih Kota / Kabupaten
              </option>
              <option
                value={JSON.stringify({
                  id: "3204",
                  name: "KABUPATEN BANDUNG",
                })}
              >
                KABUPATEN BANDUNG
              </option>
              <option
                value={JSON.stringify({ id: "3273", name: "KOTA BANDUNG" })}
              >
                KOTA BANDUNG
              </option>
            </select>
            <label>Kota / Kabupaten</label>
            {validation?.map((value, index) =>
              value.field === "regency" ? (
                <span className="helper-text red-text" key={index}>
                  {value.message}
                </span>
              ) : null
            )}
          </div>
          {(() => {
            if (districtLoading) {
              return <PulseLoader color="#ff9100" style={styles.loading} />;
            } else {
              return (
                <div className="input-field">
                  <select
                    value={district}
                    onChange={(e) => {
                      selectDistrict(e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Pilih Kecamatan
                    </option>
                    {districts.map((value, index) => (
                      <option value={JSON.stringify(value)} key={index}>
                        {value.name}
                      </option>
                    ))}
                  </select>
                  <label>Kecamatan</label>
                  {validation?.map((value, index) =>
                    value.field === "district" ? (
                      <span className="helper-text red-text" key={index}>
                        {value.message}
                      </span>
                    ) : null
                  )}
                </div>
              );
            }
          })()}
          {(() => {
            if (villageLoading) {
              return <PulseLoader color="#ff9100" style={styles.loading} />;
            } else {
              return (
                <div className="input-field">
                  <select
                    value={village}
                    onChange={(e) => {
                      selectVillage(e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Pilih Kelurahan / Desa
                    </option>
                    {villages.map((value, index) => (
                      <option value={JSON.stringify(value)} key={index}>
                        {value.name}
                      </option>
                    ))}
                  </select>
                  <label>Kelurahan / Desa</label>
                  {validation?.map((value, index) =>
                    value.field === "village" ? (
                      <span className="helper-text red-text" key={index}>
                        {value.message}
                      </span>
                    ) : null
                  )}
                </div>
              );
            }
          })()}
          <div className="input-field">
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            <label className="active">Kode Pos (boleh dikosongkan)</label>
            {validation?.map((value, index) =>
              value.field === "zipCode" ? (
                <span className="helper-text red-text" key={index}>
                  {value.message}
                </span>
              ) : null
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="valign-wrapper">
              <i className="material-icons">location_on</i> Lokasi
            </span>
            {latitude && longitude ? (
              <span className="green-text" style={styles.statusLocation}>
                <b>Sudah menandai lokasi!</b>
              </span>
            ) : (
              <span className="red-text" style={styles.statusLocation}>
                <b>Belum menandai lokasi!</b>
              </span>
            )}
          </div>
          <Gap height={10} />
          <MapContainer
            center={[defaultLatitude, defauktLongitude]}
            zoom={13}
            ref={mapRef}
            style={styles.mapContainer}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
          </MapContainer>
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
          <div className="input-field">
            <input
              type="password"
              value={pinConfirmation}
              onChange={(e) => setPinConfirmation(e.target.value)}
            />
            <label className="active">Pin Konfirmasi (6 digit angka)</label>
            {validation?.map((value, index) =>
              value.field === "pinConfirmation" ? (
                <span className="helper-text red-text" key={index}>
                  {value.message}
                </span>
              ) : null
            )}
          </div>
          <div className="input-field center">
            <button className="btn-large">Daftar</button>
            <Gap height={5} />
            <div>
              <Link to="/login" style={styles.link}>
                Sudah punya akun? Masuk disini!
              </Link>
            </div>
          </div>
          <Gap height={10} />
        </div>
      </form>
    </div>
  );
};

export default Register;

const styles = {
  card: { padding: 10, borderRadius: 10 },
  title: { fontSize: 22 },
  statusLocation: { fontSize: 17 },
  mapContainer: { height: "35vh", width: "82vw" },
  link: { fontSize: 16 },
  loading: {},
};
