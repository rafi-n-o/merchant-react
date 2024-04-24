import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalApp from "./layouts/GlobalApp";
import MainApp from "./layouts/MainApp";
import Chat from "./pages/Chat";
import ChatCustomer from "./pages/Chat/Customer";
import Home from "./pages/Home";
import Income from "./pages/Income";
import Item from "./pages/Item";
import ItemCreate from "./pages/Item/Create";
import ItemUpdate from "./pages/Item/Update";
import Login from "./pages/Login";
import My from "./pages/My";
import Order from "./pages/Order";
import OrderDetail from "./pages/Order/Detail";
import Product from "./pages/Product";
import ProductCreate from "./pages/Product/Create";
import ProductUpdate from "./pages/Product/Update";
import Register from "./pages/Register";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="" element={<GlobalApp />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="" element={<MainApp />}>
            <Route index element={<Home />} />
            <Route path="product">
              <Route index element={<Product />} />
              <Route path="create" element={<ProductCreate />} />
              <Route path=":id/update" element={<ProductUpdate />} />
            </Route>
            <Route path="item">
              <Route path="product/:productId" element={<Item />} />
              <Route
                path="product/:productId/create"
                element={<ItemCreate />}
              />
              <Route path=":id/update" element={<ItemUpdate />} />
            </Route>
            <Route path="order">
              <Route index element={<Order />} />
              <Route path=":id" element={<OrderDetail />} />
            </Route>
            <Route path="income">
              <Route index element={<Income />} />
            </Route>
            <Route path="chat">
              <Route index element={<Chat />} />
              <Route path="customer/:customerId" element={<ChatCustomer />} />
            </Route>
            <Route path="my" element={<My />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
