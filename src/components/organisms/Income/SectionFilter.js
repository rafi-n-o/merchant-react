import M from "materialize-css";
import { useEffect } from "react";

const SectionFilter = ({ status, handleSelect }) => {
  useEffect(() => {
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems, {});
  });

  return (
    <div className="card" style={styles.card}>
      <select
        value={status ? status : ""}
        onChange={(e) => {
          window.location.href = `/income?status=${e.target.value}`;
        }}
      >
        <option value="" disabled>
          Pilih Status
        </option>
        <option value="pending">Pending</option>
        <option value="success">Belum Dilepas</option>
        <option value="withdraw">Sudah Dilepas</option>
      </select>
    </div>
  );
};

export default SectionFilter;

const styles = {
  card: { padding: 10, borderRadius: 10 },
};
