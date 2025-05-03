import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/cart';
import './ProductSlider.css';

const sampleProducts = [
  {
    brand: 'FLOAT',
    name: 'SHISHIDO',
    price: 749,
    rating: 5,
    description: 'A WooCommerce product gallery slider. Revolution with mind-blowing visuals.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cta: 'Add to Cart',
    id: 1,
  },
  {
    brand: 'FLOAT',
    name: 'RUNNER',
    price: 599,
    rating: 4,
    description: 'Experience the next level of comfort and style with Float Runner.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cta: 'Add to Cart',
    id: 2,
  },
  {
    brand: 'URBAN',
    name: 'SNEAKS',
    price: 499,
    rating: 4.5,
    description: 'Urban style meets performance. Perfect for city adventures.',
    image: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cta: 'Add to Cart',
    id: 3,
  },
];

const ProductSlider = () => {
  const [current, setCurrent] = useState(0);
  const [inView, setInView] = useState(false);
  const [fade, setFade] = useState(true);
  const cardRef = useRef(null);
  const [cart, setCart] = useCart();
  const product = sampleProducts[current];

  // Intersection Observer for scroll-in animation
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [current]);

  // Fade animation on slide change
  useEffect(() => {
    setFade(false);
    const timeout = setTimeout(() => setFade(true), 50);
    return () => clearTimeout(timeout);
  }, [current]);

  const nextSlide = () => setCurrent((current + 1) % sampleProducts.length);
  const prevSlide = () => setCurrent((current - 1 + sampleProducts.length) % sampleProducts.length);

  const handleAddToCart = () => {
    // Prevent duplicate add
    const exists = cart.some(item => item.product && item.product.id === product.id);
    if (!exists) {
      const updatedCart = [...cart, { product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  return (
    <div className="product-slider-bg">
      <div
        className={`product-slider-container animated-card${inView ? ' in-view' : ''}${fade ? ' fade-bg' : ''}`}
        ref={cardRef}
        style={{
          backgroundImage: `url(${product.image})`,
        }}
      >
        <div className="slider-bg-overlay" />
        <button className="slider-arrow left" onClick={prevSlide}>&#8592;</button>
        <div className="product-slider-content">
          <div className="slider-info">
            <h2 className={`slider-brand${inView ? ' animate-brand' : ''}`}>{product.brand}</h2>
            <h1 className={`slider-title${inView ? ' animate-title' : ''}`}>
              <span className="slider-title-main">{product.name}</span>
            </h1>
            <div className={`slider-price-rating${inView ? ' animate-price' : ''}`}>
              <span className="slider-price">${product.price}</span>
              <span className="slider-rating">{'★'.repeat(Math.floor(product.rating))}{product.rating % 1 ? '½' : ''}</span>
            </div>
            <p className="slider-desc">{product.description}</p>
            <button className="slider-buy-btn" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
        <button className="slider-arrow right" onClick={nextSlide}>&#8594;</button>
      </div>
    </div>
  );
};

export default ProductSlider; 