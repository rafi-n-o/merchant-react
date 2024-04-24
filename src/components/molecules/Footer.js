const Footer = () => {
  return (
    <footer
      className="page-footer white grey-text text-darken-3 show-on-medium-and-down hide-on-large-only"
      style={styles.footer}
    >
      <div className="container" style={styles.container}>
        <a href="/" className="center grey-text text-darken-3">
          <div style={styles.containerIcon}>
            <i className="material-icons" style={styles.icon}>
              home
            </i>
          </div>
          <div>Beranda</div>
        </a>
        <a href="/order" className="center grey-text text-darken-3">
          <div style={styles.containerIcon}>
            <i className="material-icons" style={styles.icon}>
              event_note
            </i>
          </div>
          <div>Pesanan</div>
        </a>
        <a href="/my" className="center grey-text text-darken-3">
          <div style={styles.containerIcon}>
            <i className="material-icons" style={styles.icon}>
              person
            </i>
          </div>
          <div>Saya</div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;

const styles = {
  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    height: 70,
    boxShadow: "0px 20px 25px 7.5px #888888",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: -10,
  },
  containerIcon: {
    marginBottom: -4,
  },
  icon: { fontSize: 28 },
};
