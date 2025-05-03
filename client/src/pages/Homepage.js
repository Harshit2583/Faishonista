import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useCategory } from "../context/category";
import { useSearch } from "../context/search";
import { toast } from "react-hot-toast";
import { Carousel } from "react-bootstrap";
import "../css/styles/Homepage.css";
import "../css/styles/Carousel.css";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import axios from "axios";
import { AiOutlineReload, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import "../css/styles/Animations.css";
import { Carousel as BootstrapCarousel } from "react-bootstrap";
import ProductSlider from "../components/ProductSlider";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Safely get context values with default empty arrays/objects
  const cartContext = useCart() || [[], () => {}];
  const authContext = useAuth() || [null, () => {}];
  const categoryContext = useCategory() || [null, () => {}];
  const searchContext = useSearch() || [null, () => {}];
  
  const [cart, setCart] = cartContext;
  const [auth] = authContext;
  const [category] = categoryContext;
  const [search] = searchContext;

  // Carousel slides data
  const carouselSlides = [
    {
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Welcome to Fashionista",
      description: "Discover the latest trends in fashion"
    },
    {
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Summer Collection",
      description: "Explore our new summer arrivals"
    },
    {
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Special Offers",
      description: "Get up to 50% off on selected items"
    }
  ];

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // Get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products - Best offers "}>
      <ProductSlider />
      <div className="homepage">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="filters-section animate-slide-left">
                <h4 className="filter-title animate-fade-in">Filter By Category</h4>
                <div className="filter-group">
                  {categories?.map((c, index) => (
                    <Checkbox
                      key={c._id}
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {c.name}
                    </Checkbox>
                  ))}
                </div>
                <h4 className="filter-title animate-fade-in">Filter By Price</h4>
                <div className="filter-group">
                  <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                    {Prices?.map((p, index) => (
                      <div key={p._id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                        <Radio value={p.array}>{p.name}</Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
                <div className="d-flex flex-column">
                  <button
                    className="btn btn-danger hover-lift"
                    onClick={() => window.location.reload()}
                  >
                    RESET FILTERS
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <h1 className="text-center animate-slide-up">All Products</h1>
              <div className="products-grid">
                {products?.map((p, index) => (
                  <div 
                    className="product-card hover-lift animate-slide-up" 
                    key={p._id}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="product-image hover-scale"
                      alt={p.name}
                    />
                    <div className="product-info">
                      <h5 className="product-title animate-fade-in">{p.name}</h5>
                      <p className="product-price animate-fade-in">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </p>
                      <p className="product-description animate-fade-in">
                        {p.description.substring(0, 60)}...
                      </p>
                      <div className="product-actions">
                        <button
                          className="btn-details hover-lift"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="btn-add-to-cart hover-lift"
                          onClick={() => {
                            setCart([...cart, { product: p, quantity: 1 }]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, { product: p, quantity: 1 }])
                            );
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
              <div className="load-more animate-fade-in">
                {products && products.length < total && (
                  <button
                    className="load-more-btn hover-lift"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    {loading ? (
                      <span className="spin">Loading...</span>
                    ) : (
                      "Load More"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
