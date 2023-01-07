import React, { useContext, useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//context

import ProductContext from "../contexts/ProductContext";

export default function Products() {
  const productContext = useContext(ProductContext);

  let allProducts = productContext.getProducts();

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

  const searchFunction = () => {
    let result = [];
    for (let product of allProducts) {
      let min_cost = 1000;
      let max_cost = 30000;
      let c = product.cost;

      if (c >= min_cost && c <= max_cost) {
        result.push(product.name);
      }
    }
    console.log(result);
  };

  return (
    <React.Fragment>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Search</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-3" controlId="formAuthorName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name of product"
                name="name"
                value={searchQuery.name}
                onChange={updateFormField}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAuthorName">
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
            <Form.Group className="mb-3" controlId="formAuthorName">
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
            <Form.Label>Cost</Form.Label>
            <Form.Group className="d-flex mb-3" controlId="formAuthorName">
              <Form.Control
                type="text"
                placeholder="Min cost"
                name="min_cost"
                value={searchQuery.min_cost}
                onChange={updateFormField}
              />
              <Form.Control
                className="ms-3"
                type="text"
                placeholder="Max cost"
                name="max_cost"
                value={searchQuery.max_cost}
                onChange={updateFormField}
              />
            </Form.Group>
            <button onClick={productContext.setSearchProducts}>Submit</button>
            <button onClick={productContext.resetSearchProducts}>Reset</button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="col-12 col-lg-8">
        <div className="row px-5">
          {allProducts.length ? (
            allProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  className="col-12 col-md-6 col-lg-4 d-flex justify-content-center my-3"
                >
                  <Card className="card-product">
                    <Card.Img variant="top" src={product.jewelry_img_url} />
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>
                        From ${(product.cost / 100).toFixed(2)}
                      </Card.Text>
                      {/* <Button
                        className="mt-3"
                        variant="primary"
                        as={Link}
                        to={`/products/${props.product.id}/view`}
                      >
                        View
                      </Button> */}
                    </Card.Body>
                  </Card>
                </div>
              );
            })
          ) : (
            <div className="mt-4 mb-5">
              <span className="product-message">No products found</span>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
