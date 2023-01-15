import React from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import ProductContext from "../contexts/ProductContext";
import UserContext from "../contexts/UserContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProductDetails(props) {
  const productContext = useContext(ProductContext);
  const userContext = useContext(UserContext);

  //get product id from params
  const { productId } = useParams();
  //The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>

  //state
  const [product, setProduct] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [updateItemQuantity, setUpdateItemQuantity] = useState(1);

  useEffect(() => {
    (async () => {
      const product = await productContext.getProductById(productId);

      setProduct(product);
      setLoaded(true);
    })();
  }, [productId]);

  const increment = () => {
    if (updateItemQuantity >= 1 && updateItemQuantity < product.stock - 1) {
      setUpdateItemQuantity(updateItemQuantity + 1);
    } else if (updateItemQuantity <= 0) {
      setUpdateItemQuantity(1);
    }
  };

  const decrement = () => {
    if (updateItemQuantity >= 1 && updateItemQuantity < product.stock + 1) {
      setUpdateItemQuantity(updateItemQuantity - 1);
    } else if (updateItemQuantity <= 0) {
      setUpdateItemQuantity(1);
    }
  };

  const addTocart = async () => {
    let quantity = updateItemQuantity;
    let product_id = product.id;
    console.log("This is quantity and product id", quantity, product_id);

    if (quantity < product.stock) {
      await userContext.addCartItems(product_id, quantity);
    } else {
      toast.error("Sorry , item is out of stock");
    }
  };
  return (
    <React.Fragment>
      {loaded ? (
        <div className="row detail-main-box">
          <div className="container mt-5 dimg-box col-md-12 col-lg-6">
            <img
              className="detail-img"
              src={product.jewelry_img_url}
              alt="product-img"
            />
          </div>
          <div className="col col-lg-6">
            <div className="container mt-5 mb-3">
              <h1 className="detail-main-title">{product.name}</h1>
            </div>
            <div className="container mt-2">
              <h3 className="detail-main-title">$ {product.cost / 100}</h3>
            </div>
            <div className="container mt-4">
              <h5 className="detail-main-title">Product Description</h5>
            </div>
            <div className="container mt-2">
              <p className="detail-text">{product.description}</p>
            </div>
            <hr />
            <div className="container">
              <h5 className="detail-main-title">Product Info</h5>
            </div>
            <div className="container">
              <p className="detail-text">Design : {product.design}</p>
              <p className="detail-text">
                Material : {product.materials[0].material_type}
              </p>
              <p className="detail-text">Colour : {product.color.name}</p>
              <p className="detail-text">Weight : {product.weight / 100} g</p>
              <p className="detail-text">
                Dimensions: {product.width}mm (Width) X {product.height}mm
                (Height)
              </p>
              <p className="detail-text">Chain : Not included</p>
            </div>
            <hr />
            <div className="container mt-2 d-btn-box">
              <h5 className="detail-main-title">Quantity</h5>
            </div>
            <div className="d-flex mt-4 d-btn-btn">
              <button className="btn btn-sm detail-btn" onClick={increment}>
                +
              </button>
              <input
                type="number"
                style={{ width: "40px", textAlign: "center" }}
                className="form-input form-input-sm ms-2 me-2 detail-input-box"
                value={updateItemQuantity}
                disabled
              />
              <button className="btn btn-sm detail-btn" onClick={decrement}>
                -
              </button>
            </div>
            <div className="container d-btn-box">
              <button
                className="btn btn-sm detail-btn"
                onClick={() => {
                  addTocart(product.id, updateItemQuantity);
                }}
              >
                Add to Cart
              </button>
            </div>
            <div className="container py-4"></div>
          </div>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </React.Fragment>
  );
}
