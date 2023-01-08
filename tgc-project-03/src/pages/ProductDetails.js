import React from "react";
import { useContext } from "react";
import ProductContext from "../contexts/ProductContext";

export default function ProductDetails(props) {
    const productContext = useContext(ProductContext);

    const allProducts = productContext.getProducts();

    //The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>






  return (
    <React.Fragment>
      <h1>Hello</h1>
    </React.Fragment>
  );
}
