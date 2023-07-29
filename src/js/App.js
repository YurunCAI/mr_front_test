import { useState, useEffect } from 'react';
import './../css/App.css';
import AppHeader from './AppHeader';
import ProductDetailPage from './ProductDetailPage';

function App() {

  const [cart, setCart] = useState([]);
  // Load data from sessionStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save data to sessionStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add new Product to Cart
  const addProductToCart = (id, image_src, name, price, size) => {
    if (id) {
      const existingProductIndex = cart.findIndex((item) => item.id === id);
      if (existingProductIndex !== -1) {
        // product exist
        setCart((prevCart) => {
          return prevCart.map((product) =>
            product.id === id ? { ...product, quantity: product.quantity + 1 } : product
          );
        });
      } else {
        // product not found
        setCart((prevCart) => [
          ...prevCart,
          {
            id: id,
            image_src: image_src,
            name: name,
            quantity: 1,
            price: price,
            size: size
          },
        ]);
      }
    }

  };

  return (
    <div>
      <AppHeader cart={cart} />
      <ProductDetailPage addProductToCart={addProductToCart} />
    </div>
  );
}

export default App;
