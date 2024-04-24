import M from "materialize-css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalUnread } from "../../redux/action/customerMerchantChat";
import { Link } from "react-router-dom";

const Nav = () => {
  useEffect(() => {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, {});
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalUnread());
  }, [dispatch]);

  const { total_unread } = useSelector((state) => state.totalUnread);

  return (
    <>
      <div className="navbar-fixed">
        <nav className="orange accent-3">
          <div className="container">
            <div className="nav-wrapper">
              <a
                href="#"
                data-target="slide-out"
                className="sidenav-trigger show-on-large hide-on-med-and-down"
              >
                <i className="material-icons">menu</i>
              </a>
              <Link to="/chat" className="right" style={{ marginTop: 4 }}>
                <i className="fa-solid fa-comments"></i>
                {total_unread ? (
                  <sup
                    className="grey-text text-darken-3"
                    style={{
                      top: -15,
                      left: -7,
                      paddingTop: total_unread > 9 ? 3 : 3,
                      paddingBottom: total_unread > 9 ? 3 : 3,
                      paddingRight: total_unread > 9 ? 6 : 9,
                      paddingLeft: total_unread > 9 ? 6 : 9,
                      backgroundColor: "white",
                      borderRadius: "50%",
                      fontSize: 14,
                      fontWeight: "bold",
                      marginRight: -6,
                    }}
                  >
                    {total_unread}
                  </sup>
                ) : null}
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <ul id="slide-out" className="sidenav">
        <li>
          <a href="/">Beranda</a>
        </li>
        <li>
          <a href="/order">Pesanan</a>
        </li>
        <li>
          <a href="/product">Produk</a>
        </li>
      </ul>
    </>
  );
};

export default Nav;
