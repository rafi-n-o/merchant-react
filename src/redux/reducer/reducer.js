import { combineReducers } from "redux";
import { chats, totalUnread } from "./chat";
import { customers } from "./customer";
import { families } from "./family";
import { item, items } from "./item";
import { needs } from "./need";
import { income, order, orders } from "./order";
import { product, products } from "./product";
import { user } from "./user";
import { districts, provinces, regencies, villages } from "./wilayah";

const reducer = combineReducers({
  provinces,
  regencies,
  districts,
  villages,
  needs,
  families,
  customers,
  products,
  product,
  items,
  item,
  orders,
  order,
  income,
  chats,
  totalUnread,
  user,
});

export default reducer;
