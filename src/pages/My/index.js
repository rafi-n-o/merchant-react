const My = () => {
  const btnLogout = () => {
    localStorage.removeItem("token-merchant");
    window.location.href = "/login";
  };

  return (
    <button
      className="btn red darken-2"
      onClick={() => {
        btnLogout();
      }}
    >
      Sign Out
    </button>
  );
};

export default My;
