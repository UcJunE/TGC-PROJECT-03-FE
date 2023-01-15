//dependencies
import React, { useEffect, useState } from "react";
import axios from "axios";

//context
import ProductContext from "../contexts/ProductContext";

const BASE_API_URL = "https://ucjune-project03-db.onrender.com/api";

export default function ProductsProvider(props) {
  //states
  const [products, setProducts] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    name: "",
    color_id: "",
    materials: "",
    min_cost: "",
    max_cost: "",
  });

  useEffect(() => {
    const getAllProducts = async () => {
      let response = await axios.get(BASE_API_URL + "/products");
      setProducts(response.data);
      console.log("rest");
    };
    const getSearchOptions = async () => {
      let response = await axios.get(BASE_API_URL + "/products/search_options");
      setSearchOptions(response.data);
    };
    getAllProducts();
    getSearchOptions();
  }, []);

  const getProductsBySearch = async () => {
    let response = await axios.get(BASE_API_URL + "/products/search", {
      params: searchQuery,
    });
    console.log("this is what i get from be via search", response.data);
    setProducts(response.data);
    console.log(response.data);
    return response.data;
  };

  const resetSearch = async () => {
    setSearchQuery({
      name: "",
      color_id: "",
      materials: "",
      min_cost: "",
      max_cost: "",
    });
    let response = await axios.get(BASE_API_URL + "/products");
    setProducts(response.data);
    console.log("This is what i get after clear the query", searchQuery);
  };

  const productsContext = {
    searchQuery,
    setSearchQuery,
    products,
    getProducts: () => {
      return products;
    },
    setSearchProducts: async () => {
      await getProductsBySearch();
      return products;
    },
    resetSearchProducts: async () => {
      await resetSearch();
      return products;
    },
    getSelection: () => {
      return searchOptions;
    },
    getProductById: async (productId) => {
      console.log("this function getproductbyid RAN ");
      const response = await axios.get(BASE_API_URL + "/products/" + productId);
      const product = response.data;
      console.log("This is the product get fomr PU", product);
      return product;
    },
  };

  return (
    <ProductContext.Provider value={productsContext}>
      {/* To access child components nested inside ProductsProvider */}
      {props.children}
    </ProductContext.Provider>
  );
}
