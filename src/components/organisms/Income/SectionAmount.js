import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { getIncome } from "../../../redux/action/order";

const SectionAmount = ({ status }) => {
  const { income } = useSelector((state) => state.income);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const btnFilter = () => {
    setLoading(true);
    getIncome(status, startDate, endDate)
      .then((res) => {
        dispatch({
          type: "GET_INCOME",
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

  if (status === "pending") {
    return (
      <div className="card" style={styles.card}>
        <div className="card-content center">
          <div style={styles.income}>{income.amount}</div>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="card" style={styles.card}>
        <div className="card-content center">
          <div style={styles.income}>{income.amount}</div>
        </div>
      </div>
    );
  }

  if (status === "withdraw") {
    return (
      <div className="card" style={styles.card}>
        <div className="card-content center">
          {loading ? (
            <SyncLoader color="#ff9100" />
          ) : (
            <div style={styles.income}>{income.amount}</div>
          )}
        </div>
        <div className="input-field">
          <input type="date" onChange={(e) => setStartDate(e.target.value)} />
          <label>Start</label>
        </div>
        <div className="input-field">
          <input type="date" onChange={(e) => setEndDate(e.target.value)} />
          <label>End</label>
        </div>
        <div style={styles.end}>
          <button
            className="btn"
            onClick={() => btnFilter()}
            style={styles.btn}
          >
            <i className="material-icons">search</i>
          </button>
        </div>
      </div>
    );
  }
};

export default SectionAmount;

const styles = {
  card: { padding: 10, borderRadius: 10 },
  income: { fontSize: 36, color: "red" },
  end: { display: "flex", justifyContent: "end" },
  btn: { borderRadius: 10 },
};
