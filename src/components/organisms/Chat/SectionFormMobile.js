const SectionFormMobile = ({ message, setMessage, formMessage }) => {
  return (
    <footer
      className="page-footer card white grey-text text-darken-3 show-on-medium-and-down hide-on-large-only"
      style={styles.footer}
    >
      <form onSubmit={formMessage}>
        <div className="container row" style={styles.container}>
          <div className="input-field col s10">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <label>Tulis Pesan...</label>
          </div>
          <div className="input-field col s2">
            <button className="btn">
              <i className="material-icons">send</i>
            </button>
          </div>
        </div>
      </form>
    </footer>
  );
};

export default SectionFormMobile;

const styles = {
  footer: {
    position: "fixed",
    margin: 0,
    bottom: 0,
    height: 150,
    width: "100%",
  },
  container: {
    marginTop: -15,
  },
};
