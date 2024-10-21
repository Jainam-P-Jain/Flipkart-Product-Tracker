import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader'; // Assuming you have a loader component
import Products from '../Products/Products'; // Import your Products component

const ExploreProducts = () => {
    const { title } = useParams(); // Get the title from the URL (e.g., watches, mobiles)
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            console.log(title)
            setLoading(true);
            try {
                const response = await axios.get(`https://flipkart-product-tracker.onrender.com/api/products?title=${title}`);
                setProducts(response.data); // Assuming the API returns an array of products
            } catch (error) {
                setError('Failed to fetch products.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [title]); // Re-fetch the data whenever the title changes

    return (
        <div className="container mt-5">
            <div className="text-center mb-5">
            <h2 className="text-center mb-4">Recently searched products</h2>

            {loading && <Loader />}
            {error && <div className="text-danger">{error}</div>}
            {!loading && !error && products.length === 0 && <div>No products found for {title}</div>}

            <div className="row">
                {products.map((product) => (
                    <Products key={product.id} product={product} />
                ))}
            </div>
            </div>
        </div>
    );
};

export default ExploreProducts;