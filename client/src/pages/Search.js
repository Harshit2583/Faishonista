import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const Search = () => {
  const [values] = useSearch();
  const [cart, setCart] = useCart();

  const results = values?.results || [];

  const addToCart = (product) => {
    setCart([...cart, { product, quantity: 1 }]);
    localStorage.setItem("cart", JSON.stringify([...cart, { product, quantity: 1 }]));
    toast.success("Item Added to cart");
  };

  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {results.length < 1
              ? "No Products Found"
              : `Found ${results.length} products`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description?.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <Link to={`/product/${p.slug}`} className="btn btn-primary ms-1">
                    More Details
                  </Link>
                  <button 
                    className="btn btn-secondary ms-1"
                    onClick={() => addToCart(p)}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;