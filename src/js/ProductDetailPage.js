import { useEffect, useState } from 'react';
import './../css/ProductDetailPage.css';

export default function ProductDetailPage({addProductToCart}) {

    const [productDetail, setProductDetail] = useState();
    const [size, setSize] = useState();
    const [errorSize,setErrorSize] = useState(false);
    // get from api, init page
    useEffect(() => {
        fetch('https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product')
            .then(response => response.json())
            .then(data => {
                setProductDetail(data);
            });
    }, []);
    return (
        <div className="product_detail_page">
            {productDetail ?
                <div className='product_detail_main'>
                    <div className='product_detail_image'>
                        <img src={productDetail.imageURL} />
                    </div>
                    <div className='product_detail_content'>
                        <h1 className='product_detail_title'>{productDetail.title}</h1>
                        <div className='product_detail_price'>${productDetail.price.toFixed(2)}</div>
                        <div className='product_detail_description'>{productDetail.description}</div>
                        <div className='product_detail_variations'>
                            <label style={{fontSize:"0.8em", fontWeight:"600"}}>SIZE<span style={{color:"#C90000"}}>*</span> <span style={{color:"#222222"}}>{size?.label}</span></label>
                            <div>
                                {productDetail.sizeOptions.map((sizeOption) => (
                                    <button className={size?.id === sizeOption.id ? "size_active" : ""} key={sizeOption.id} onClick={() => {setSize({ id: sizeOption.id, label: sizeOption.label });setErrorSize(false)}}>{sizeOption.label}</button>
                                ))}
                            </div>
                        </div>
                        <div className={errorSize=== true ? "error_message active" : "error_message"}>Please select a size.</div>
                        <button className='product_detail_add_to_cart' onClick={() => {
                            if (size && size.id) {
                                addProductToCart(size.id, productDetail.imageURL, productDetail.title, productDetail.price, size.label)
                                console.log("add to cart clicked")
                            } else {
                                console.log('No Size Select');
                                setErrorSize(true)
                            }
                        }}>
                            Add to Cart
                        </button>
                    </div>
                </div>
                :
                <div className='product_detail_main'>
                    <div>The Product Not Found</div>
                </div>
            }
        </div>
    );
}