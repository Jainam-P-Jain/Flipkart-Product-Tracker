import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import Loader from "../Loader/Loader";
import flipkartLogo from "../../assets/flipkart_logo.png";
import ProductDetails from "../ProductDetails/ProductDetails";
import './ProductFetcher.css'; // Custom CSS for extra styling
import { useParams } from "react-router-dom";


const ProductFetcher = () => {
    const [url, setUrl] = useState('');
    const [product, setProduct] = useState(null);
    const [priceChanged, setPriceChanged] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const searchInputRef = useRef(null);
    const { id } = useParams();
    


    useEffect(() => {
        if (!id && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [id]);
  
    // Fetch product details by ID if a id is passed in the props
    useEffect(() => {
        if (id) {
            fetchProductDetailsById(id);

        }
    }, [id]);
  
  
  

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };
    const fetchProductDetailsById = async (id) => {
        setError('');
        setLoading(true);
        setProduct(null);
        
        try {
           console.log(id)
            const response = await axios.get(`https://flipkart-product-tracker.onrender.com/api/products/${id}`);
            setProduct(response.data);
            setPriceChanged(null); 
            
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            setError('Failed to fetch product by ID');
        } finally {
            setLoading(false); 
        }
    };

    const fetchProductDetails = async () => {
        if (!url.trim()) {
            setError('Please enter a URL');
            return;
        }
        if (!isValidUrl(url)) {
            setError('Please enter a valid URL');
            setUrl('');
            return;
        }
        setError('');
        setLoading(true); 
        setProduct(null);
        try {
            const response = await axios.post('https://flipkart-product-tracker.onrender.com/api/products/fetch-product', { url });
            setProduct(response.data);
            setPriceChanged(null); 
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false); 
        }
    };

    const clearInput = () => {
        setUrl('');
        setProduct(null);
        setError('');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fetchProductDetails();
        }
    };

    const recheckProductValue = async () => {
        if (!product) return; 

        try {
            const response = await axios.post('https://flipkart-product-tracker.onrender.com/api/products/fetch-product', { url });
            const updatedProduct = response.data;

            
            if (updatedProduct.currentPrice !== product.currentPrice) {
                setPriceChanged({
                    oldPrice: product.currentPrice,
                    newPrice: updatedProduct.currentPrice,
                });
                setProduct(updatedProduct); 

                
                toast.success(`Price has changed from ₹${product.currentPrice} to ₹${updatedProduct.currentPrice}`);
            } else {
                setPriceChanged({ samePrice: true }); 

                
                toast.info('Price is the same.');
            }
        } catch (error) {
            console.error('Error rechecking product:', error);
        }
    };
    

    return (
        <div className="container mt-5">
            <div className="card border rounded-5 shadow-lg p-5">
                <header className="text-center">
                    <h3 className="text-dark mb-3">
                        Search{' '}
                        <span className="marketplace-logo mx-1">
                            <img src={flipkartLogo} alt="Flipkart" height="25" />
                        </span>{' '}
                        Flipkart Price History
                    </h3>
                    <p className="lead text-muted">
                        Stay on top of price changes for your favorite products on Flipkart.
                    </p>
                </header>

                {/* Input Section */}
                <div className="input-group mb-2 w-75 mx-auto">
                    <div className="position-relative w-75">
                        <input
                            type="text"
                            className={`form-control form-control-md ps-4 pe-5 py-3 border rounded-5 ${error ? 'is-invalid' : ''}`}
                            placeholder="Paste Flipkart Product Link"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        {url && (
                            <button
                                className="btn position-absolute top-50 end-0 translate-middle-y bg-transparent border-0 text-secondary pe-3"
                                onClick={clearInput}
                                style={{ fontSize: '24px', lineHeight: 0, padding: '0' }}
                            >
                                ×
                            </button>
                        )}
                    </div>
                    <button className="btn btn-dark ms-2 border rounded-5 btn-md px-4 py-3" onClick={fetchProductDetails}>
                        Search
                    </button>
                    {error && <div className="text-danger ms-3 m-2">{error}</div>}
                </div>

                {/* Show the Loader while fetching */}
                {loading && <Loader />}

                {/* Display Product Details once fetched */}
                {product && !loading && <ProductDetails product={product} recheckProductValue={recheckProductValue} />}

                {/* Toast Container */}
                <ToastContainer />
            </div>
        </div>
    );
};


export default ProductFetcher;
