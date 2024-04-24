const SectionFilter = ({ status }) => {
  return (
    <div className="card" style={styles.card}>
      <select
        value={status ? status : ""}
        onChange={(e) =>
          (window.location.href = `order?status=${e.target.value}`)
        }
      >
        <option disabled>Pilih Status</option>
        <option value="">Semua</option>
        <option value="pending">Belum Bayar</option>
        <option value="success">Disetujui</option>
        <option value="packing">Diproses</option>
        <option value="delivery">Sedang Diantar</option>
        <option value="delivered">Telah Diantar</option>
        <option value="failure">Gagal</option>
      </select>
    </div>
  );
};

export default SectionFilter;

const styles = {
  card: { padding: 10, borderRadius: 10 },
};
