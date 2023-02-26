import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
//context

import ProductContext from "../contexts/ProductContext";

export default function Products() {
  const productContext = useContext(ProductContext);

  let allProducts = productContext.getProducts() || [];

  // from parent
  const searchQuery = productContext.searchQuery;

  const updateFormField = (e) => {
    productContext.setSearchQuery({
      ...searchQuery,
      [e.target.name]: e.target.value,
    });
  };

  let selection = productContext.getSelection();
  const generateDropdownOptions = (choices) => {
    if (choices) {
      return choices.map((choice, index) => {
        return (
          <option key={index} value={choice[0]}>
            {choice[1]}
          </option>
        );
      });
    }
  };

  // const searchFunction = () => {
  //   let result = [];
  //   for (let product of allProducts) {
  //     let min_cost = 1000;
  //     let max_cost = 30000;
  //     let c = product.cost;

  //     if (c >= min_cost && c <= max_cost) {
  //       result.push(product.name);
  //     }
  //   }
  //   console.log(result);
  // };

  return (
    <React.Fragment>
      <div className="container-fluid landing-box landing-pic">
        {/* <img
          className="landing-pic"
          src={require("../assets/images/landing-page.png")}
          alt="landing-img"
        /> */}
        {/* <div className="landing-pic container"></div> */}
        <Button href="#product-section" className="hero-btn">
          Shop Now
        </Button>
      </div>

      <div className="container my-4 " id="product-section">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header className="search-container">
              Search
            </Accordion.Header>
            <Accordion.Body className="search-container">
              <FloatingLabel className="mb-3" label="Enter name of product">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter name of product"
                  value={searchQuery.name}
                  onChange={updateFormField}
                />
              </FloatingLabel>
              <Form.Group className="mb-3">
                <Form.Label>Colour</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="color_id"
                  value={searchQuery.color_id}
                  onChange={updateFormField}
                >
                  {generateDropdownOptions(selection.colors)}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Material</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="materials"
                  value={searchQuery.materials}
                  onChange={updateFormField}
                >
                  {generateDropdownOptions(selection.materials)}
                </Form.Select>
              </Form.Group>
              <div className="container px-0 d-flex">
                <FloatingLabel
                  className="d-flex mb-3 form-box"
                  label="Min cost"
                >
                  <Form.Control
                    type="text"
                    placeholder="Min cost"
                    name="min_cost"
                    value={searchQuery.min_cost}
                    onChange={updateFormField}
                  />
                </FloatingLabel>
                <FloatingLabel className="mb-3 mx-2 form-box" label="Max cost">
                  <Form.Control
                    type="text"
                    placeholder="Max cost"
                    name="max_cost"
                    value={searchQuery.max_cost}
                    onChange={updateFormField}
                  />
                </FloatingLabel>
              </div>

              <button
                className="btn product-btn"
                onClick={productContext.setSearchProducts}
              >
                Submit
              </button>
              <button
                className="btn product-btn"
                onClick={productContext.resetSearchProducts}
              >
                Reset
              </button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className="col col-lg">
          <div className="row px-5 mt-4">
            {allProducts.length ? (
              allProducts.map((product) => {
                return (
                  <div
                    key={product.id}
                    className="col-12 col-md-6 col-lg-4 d-flex justify-content-center my-3 card-product"
                  >
                    <Card>
                      <Card.Img variant="top" src={product.jewelry_img_url} />
                      <Card.Body className="d-flex flex-column justify-content-between">
                        <Card.Title className="product-title">
                          {product.name}
                        </Card.Title>
                        <Card.Text className="product-text">
                          From ${(product.cost / 100).toFixed(2)}
                        </Card.Text>
                        <Button
                          className="mt-3 cart-btn"
                          as={Link}
                          to={`/products/${product.id}/info`}
                        >
                          VIEW
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })
            ) : (
              <div className="mt-4 mb-5 no-product-box">
                <span className="product-msg">No products found</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
