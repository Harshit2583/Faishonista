import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../css/styles/CartStyles.css";
import "../css/styles/Animations.css";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart, removeFromCart, updateCartQuantity] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.product.price * item.quantity;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cart-page animate-fade-in">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1 animate-slide-up">
              {!auth?.user
                ? "Hello Guest"
                : `Hello ${auth?.token && auth?.user?.name}`}
              <p className="text-center delay-100 animate-slide-up">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout!"
                    }`
                  : "Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-7 p-0 m-0">
            {cart?.map((item, index) => (
              !item.product ? null : (
                <div
                  className="row card flex-row hover-lift animate-slide-up"
                  key={item.product._id}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${item.product._id}`}
                      className="card-img-top hover-scale"
                      alt={item.product.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p className="animate-fade-in">{item.product.name}</p>
                    <p className="animate-fade-in">
                      {item.product.description.substring(0, 30)}
                    </p>
                    <p className="animate-fade-in">
                      Price: {item.product.price}
                    </p>
                    <div className="quantity-controls">
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() =>
                          updateCartQuantity(
                            item.product._id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() =>
                          updateCartQuantity(
                            item.product._id,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger hover-scale"
                      onClick={() => removeFromCart(item.product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )
            ))}
          </div>

          <div className="col-md-5 cart-summary">
            <h2 className="animate-fade-in">Cart Summary</h2>
            <p className="animate-fade-in">Total | Checkout | Payment</p>
            <hr />
            <h4 className="animate-fade-in">Total: {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3 animate-fade-in">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning hover-lift"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3 animate-fade-in">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning hover-lift"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning hover-lift"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}

            <div className="mb-3">
              {!clientToken || !auth?.token || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary hover-lift"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? (
                      <span className="spin">Processing...</span>
                    ) : (
                      "Make Payment"
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;