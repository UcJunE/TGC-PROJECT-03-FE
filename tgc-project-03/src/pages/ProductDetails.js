import React from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import ProductContext from "../contexts/ProductContext";
import UserContext from "../contexts/UserContext";
import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
export default function ProductDetails(props) {
  const productContext = useContext(ProductContext);
  const userContext = useContext(UserContext);

  //get product id from params
  const { productId } = useParams();
  //The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>

  //state
  const [product, setProduct] = useState([]);
  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const product = await productContext.getProductById(productId);

      setProduct(product);
      setLoaded(true);
    })();
  }, [productId]);

  return (
    <React.Fragment>
      <div className="container mt-5">
        <img
          className="detail-img"
          src={product.jewelry_img_url}
          alt="product-img"
          style={{}}
        />
        <hr />
        <div className="container mt-3 mb-3">
          <h1>{product.name}</h1>
        </div>
        <div className="container mt-2">
          <h3>$ {product.cost / 100}</h3>
        </div>
        <div className="container mt-4">
          <h5>Product Description</h5>
        </div>
        <div className="container mt-2">
          <p>{product.description}</p>
        </div>
        <hr />
        <div className="container">
          <h5>Product Info</h5>
        </div>
        <div className="container">
          <p>Design : {product.design}</p>
          <p>Material : {product.materials[0].material_type}</p>
          <p>Colour : {product.color.name}</p>
          <p>Weight : {product.weight / 100} g</p>
          <p>
            Dimensions: {product.width}mm (Width) X {product.height}mm (Height)
          </p>
          <p>Chain : Not included</p>
        </div>
        <hr />
        <div className="container mt-2">
        <h5>Quantity</h5>
        </div>
        <div className="d-flex mt-4">
          <button className="btn btn-sm my-btn">+</button>
          <input
            type="number"
            style={{ width: "40px", textAlign: "center" }}
            className="form-input form-input-sm ms-2 me-2"
            disabled
          />
          <button className="btn btn-sm my-btn">-</button>
          <button
            className="btn btn-sm btn-primary ms-2"
            // onClick={() => {
            //   confirmUpdateItem(updateItem, updateItemQuantity);
            // }}
          >
            Add to Cart
          </button>
        </div>
        <div className="container py-5" ></div>
      </div>
    </React.Fragment>
  );
}
