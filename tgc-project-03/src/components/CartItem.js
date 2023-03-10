import React from "react";
import { useContext, useState, useEffect } from "react";

import UserContext from "../contexts/UserContext";

export default function CartItem(props) {
  const userContext = useContext(UserContext);

  const [updateItem, setUpdateItem] = useState("");
  const [updateItemQuantity, setUpdateItemQuantity] = useState("");

  const cartQuantity = (quantity) => {
    setUpdateItemQuantity(quantity);
  };

  useEffect(() => {
    cartQuantity(props.cartItem.quantity);
  }, []);

  const setTargetedItem = (id) => {
    setUpdateItem(id);
  };

  const increment = () => {
    setTargetedItem(props.cartItem.jewelry.id);
    if (
      updateItemQuantity >= 1 &&
      updateItemQuantity < props.cartItem.jewelry.stock - 1
    ) {
      setUpdateItemQuantity(updateItemQuantity + 1);
    } else if (updateItemQuantity <= 0) {
      setUpdateItemQuantity(1);
    }
  };

  const decrement = () => {
    setTargetedItem(props.cartItem.jewelry.id);
    if (
      updateItemQuantity >= 1 &&
      updateItemQuantity < props.cartItem.jewelry.stock + 1
    ) {
      setUpdateItemQuantity(updateItemQuantity - 1);
    } else if (updateItemQuantity <= 0) {
      setUpdateItemQuantity(1);
    }
  };

  const confirmUpdateItem = async (id, quantity) => {
    let result = await props.confirmUpdateItem(id, quantity);
    console.log("what does confirmpdate return", result);
    setUpdateItem("");
    setUpdateItemQuantity(result);
    return result;
  };

  const confirmRemoveItem = async (product_id) => {
    let result = await userContext.deleteCartItems(product_id);
    //the result will be true
    if (result) {
      await props.refreshCart();
    } else {
      return false;
    }
  };

  

  return (
    <li className="list-group-item">
      <div className="row cart-container">
        <div className="col col-3">
          <img
            className="cart-img"
            src={props.cartItem.jewelry.jewelry_thumbnail_url}
            alt="product-img"
          ></img>
        </div>
        <div className="col col-6">
          <h6
            className="my-bold"
            style={{ fontSize: "small", height: "fit-content" }}
          >
            {props.cartItem.jewelry.name}
          </h6>
          <h6 style={{ fontSize: "small", height: "fit-content" }}>
            $ {props.cartItem.jewelry.cost / 100}
          </h6>

          {updateItem ? (
            <div className="d-flex">
              <button className="btn btn-sm cart-btn" onClick={increment}>
                +
              </button>
              <input
                type="number"
                style={{ width: "40px", textAlign: "center" }}
                className="form-input form-input-sm ms-2 me-2"
                value={updateItemQuantity}
                disabled
              />
              <button className="btn btn-sm cart-btn" onClick={decrement}>
                -
              </button>
              <button
                className="btn btn-sm cart-btn ms-2"
                onClick={() => {
                  confirmUpdateItem(updateItem, updateItemQuantity);
                }}
              >
                Update
              </button>
            </div>
          ) : (
            <div className="d-flex">
              <button
                className="btn btn-sm cart-btn"
                onClick={increment}
                value={updateItemQuantity}
              >
                +
              </button>
              <input
                type="number"
                style={{ width: "40px", textAlign: "center" }}
                className="form-input form-input-sm ms-2 me-2"
                disabled
                value={props.cartItem.quantity}
              />
              <button
                className="btn btn-sm cart-btn"
                onClick={decrement}
                value={updateItemQuantity}
              >
                -
              </button>
            </div>
          )}
        </div>
        <div className="col col-2">
          <button
            className="btn btn-sm cart-btn"
            onClick={() => {
              confirmRemoveItem(props.cartItem.jewelry.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
