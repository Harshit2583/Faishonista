import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import "../css/styles/ProductDetails.css";
import "../css/styles/Animations.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart, addToCart] = useCart();

  // Initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Similar Product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="product-details animate-fade-in">
        <div className="row container product-details-container">
          <div className="col-md-6 product-image-section animate-slide-left">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="card-img-top product-image hover-scale"
              alt={product.name}
              height="300"
              width={"350px"}
            />
          </div>
          <div className="col-md-6 product-info-section animate-slide-right">
            <h1 className="text-center animate-fade-in">Product Details</h1>
            <h6 className="animate-fade-in">Name : {product.name}</h6>
            <h6 className="animate-fade-in">
              Description : {product.description}
            </h6>
            <h6 className="animate-fade-in">
              Price : {product?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h6>
            <h6 className="animate-fade-in">Category : {product?.category?.name}</h6>
            <button
              className="btn btn-secondary ms-1 hover-lift"
              onClick={() => {
                addToCart({ product, quantity: 1 });
                toast.success("Item Added to cart");
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <hr />
        <div className="row container similar-products animate-fade-in">
          <h6 className="text-center animate-slide-up">Similar Products</h6>
          {relatedProducts.length < 1 && (
            <p className="text-center animate-fade-in">No Similar Products found</p>
          )}
          <div className="d-flex flex-wrap">
            {relatedProducts?.map((p, index) => (
              <div
                className="card m-2 hover-lift animate-slide-up"
                key={p._id}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top hover-scale"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title animate-fade-in">{p.name}</h5>
                    <h5 className="card-title card-price animate-fade-in">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text animate-fade-in">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1 hover-lift"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1 hover-lift"
                      onClick={() => {
                        addToCart({ product: p, quantity: 1 });
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;