import React, { useEffect, useReducer } from "react";
import { data } from "./data.js";

const reducer = (state, action) => {
  if (action.type === "Increase") {
    return {
      ...state,
      cartItem: state.cartItem.map((it) =>
        it.id === action.payload.id
          ? { ...it, amount: it.amount + 1 }
          : { ...it }
      ),
    };
  }
  if (action.type === "Decrease") {
    return {
      ...state,
      cartItem: state.cartItem.map((item) =>
        item.id === action.payload.id && item.amount > 0
          ? { ...item, amount: item.amount - 1 }
          : { ...item }
      ),
    };
  }
  if (action.type === "DELETE_ITEM") {
    const rmItem = state.cartItem.filter(
      (item) => item.id !== action.payload.id
    );
    return {
      ...state,
      cartItem: rmItem,
    };
  }

  throw new Error("not correct Type");
};
//! khi muốn thay đổi property trong object thì không cần làm state riêng cho nó.
const defaultItemState = {
  cartItem: data,
};

function App() {
  const [state, dispatch] = useReducer(reducer, defaultItemState);
  useEffect(() => {
    if (state.cartItem.length === 0) return;
    const filterPrice = state.cartItem.map((item) => item.price * item.amount);
    const totalPrice = filterPrice.reduce((acc, cur) => acc + cur);
    document.querySelector(".price").textContent = totalPrice;
  });
  return (
    <div className="container">
      <nav>
        <ul>
          <li style={{ fontSize: "20px" }}>UseReducer</li>
          <li className="bag">
            Your bag have <span>{state.cartItem.length}</span> items
          </li>
        </ul>
      </nav>
      <div className="content">
        <h1>YOUR BAG</h1>
        {state.cartItem.length === 0 ? (
          <h1>you bag is empty</h1>
        ) : (
          <div className="card">
            {state.cartItem.map((it) => {
              const { id, img, name, price, amount } = it;
              return (
                <div key={id} className="cart-item">
                  <img src={img} alt="" />
                  <div>
                    <h4>{name}</h4>
                    <h3>${price}</h3>
                    <button
                      onClick={() =>
                        dispatch({ type: "DELETE_ITEM", payload: { id: id } })
                      }
                    >
                      remove
                    </button>
                  </div>
                  <div className="increase">
                    <button
                      onClick={() =>
                        dispatch({
                          type: "Increase",
                          payload: { id: id },
                        })
                      }
                    >
                      +
                    </button>

                    {amount}

                    <button
                      onClick={() =>
                        dispatch({ type: "Decrease", payload: { id: id } })
                      }
                    >
                      -
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <hr />
        {state.cartItem.length > 0 && (
          <div className="total">
            <p>Total:</p>
            <p className="price"></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
