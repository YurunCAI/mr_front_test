import { useState } from 'react';
import './../css/AppHeader.css';

export default function AppHeader({ cart }) {
    const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);
    const [showCartDetail, setShowCartDetail] = useState(false);

    // handle Cart detail open/close
    const handleCartClick = () => {
        setShowCartDetail(prevState => !prevState);
    };

    return (
        <header className='header'>
            <div className='header_nav'>
                <div className='header_cart'>
                    <button onClick={handleCartClick}>
                        <span className='header_cart_icon_placeholder'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16"> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" /> </svg>
                         </span>
                        <span className='header_cart_content_placeholder'>My Cart</span>
                        ( {totalQuantity} )
                    </button>
                </div>
                <div className={`header_cart_detail ${showCartDetail ? 'show' : ''}`}>
                    {cart.length > 0 ? (cart.map((product) => (
                        <div className='header_cart_single' key={product.id}>
                            <div className='header_cart_image'>
                                <img src={product.image_src} alt={product.name} />
                            </div>
                            <div className='header_cart_content'>
                                <p>{product.name}</p>
                                <p>
                                    {product.quantity} x <span style={{ fontWeight: "600" }}>${product.price.toFixed(2)}</span>
                                </p>
                                <p>Size: {product.size}</p>
                            </div>
                        </div>
                    )))
                        :
                        (<div style={{ textAlign: "center" }}>Cart is Empty</div>)
                    }
                </div>
            </div>
        </header>
    );
}