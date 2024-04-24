import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Gap from "../../../components/atoms/Gap";
import SectionAttach from "../../../components/organisms/Chat/SectionAttach";
import SectionChat from "../../../components/organisms/Chat/SectionChat";
import SectionFormDesktop from "../../../components/organisms/Chat/SectionFormDesktop";
import SectionFormMobile from "../../../components/organisms/Chat/SectionFormMobile";
import { authentication } from "../../../redux/action/auth";
import {
  getChats,
  getTotalUnread,
  storeChat,
} from "../../../redux/action/customerMerchantChat";
import { getOrder } from "../../../redux/action/order";
import { getProduct } from "../../../redux/action/product";

const ChatCustomer = () => {
  const { customerId } = useParams();

  let [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const orderId = searchParams.get("orderId");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState();

  const { chats } = useSelector((state) => state.chats);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("token-merchant")) {
      window.location.href = "/login";
    }

    authentication()
      .then(() => {
        if (productId) {
          getProduct(productId).then((res) => {
            dispatch({ type: "GET_PRODUCT", payload: res.data });
          });
          getChats(customerId).then((res) => {
            dispatch({ type: "GET_CHATS", payload: res.data });
            dispatch(getTotalUnread());
          });
        }
        if (orderId) {
          getOrder(orderId).then((res) => {
            dispatch({ type: "GET_ORDER", payload: res.data });
          });
          getChats(customerId).then((res) => {
            dispatch({ type: "GET_CHATS", payload: res.data });
            dispatch(getTotalUnread());
          });
        }
        if (!productId && !orderId) {
          getChats(customerId).then((res) => {
            dispatch({ type: "GET_CHATS", payload: res.data });
            dispatch(getTotalUnread());
          });
        }
      })
      .catch((err) => {
        if (err.message === "invalid token") {
          window.location.href = "/login";
        } else {
          console.log(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const formMessage = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = {
      message: message,
      productId,
      orderId,
    };

    if (productId) {
      storeChat(customerId, form)
        .then((res) => {
          window.location.href = `/chat/customer/${customerId}`;
        })
        .catch((err) => {
          toast("pesan tidak boleh kosong!");
        })
        .finally(() => {
          setLoading(false);
        });
    }
    if (orderId) {
      storeChat(customerId, form)
        .then((res) => {
          window.location.href = `/chat/customer/${customerId}`;
        })
        .catch((err) => {
          toast("pesan tidak boleh kosong!");
        })
        .finally(() => {
          setLoading(false);
        });
    }
    if (!productId && !orderId) {
      {
        storeChat(customerId, form)
          .then((res) => {
            window.location.reload();
          })
          .catch((err) => {
            toast("pesan tidak boleh kosong!");
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  return (
    <>
      <div className="container">
        <div ref={listRef}>
          {/* chat */}
          <SectionChat chats={chats} />
          {/* attach */}
          <SectionAttach productId={productId} orderId={orderId} />
        </div>
      </div>
      <Gap height={150} />
      {/* desktop */}
      <SectionFormDesktop
        message={message}
        setMessage={setMessage}
        formMessage={formMessage}
      />
      {/* mobile */}
      <SectionFormMobile
        message={message}
        setMessage={setMessage}
        formMessage={formMessage}
      />
    </>
  );
};

export default ChatCustomer;
