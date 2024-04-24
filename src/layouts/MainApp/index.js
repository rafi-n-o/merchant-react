import { Outlet } from "react-router-dom";
import Footer from "../../components/molecules/Footer";
import Nav from "../../components/molecules/Nav";

const MainApp = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainApp;
