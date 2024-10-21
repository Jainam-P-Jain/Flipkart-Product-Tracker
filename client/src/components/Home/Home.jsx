import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css"; // Import custom CSS
import Products from "../Products/Products";
import Navbar from "../Navbar/Navbar"; // Import Navbar

const HomePage = () => {
    const [productsData, setProductsData] = useState({
        mostRecent: [],
        mostVisited: [],
        mostRated: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [url, setUrl] = useState(""); 
    const [searchResults, setSearchResults] = useState([]); 
    const [selectedCategory, setSelectedCategory] = useState(""); 
    // Function to fetch products from the backend
    const fetchProducts = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get("https://flipkart-product-tracker.onrender.com/api/products/all"); 
            setProductsData(response.data); // Set products from response
        } catch (error) {
            console.error("Error fetching products:", error);
            setError("Error fetching products");
        } finally {
            setLoading(false);
        }
    };

    
    const findRelatedProducts = async () => {
        setError("");
        setLoading(true); 
        setSearchResults([]); 
        try {
            const response = await axios.get(`https://flipkart-product-tracker.onrender.com/api/products?title=${encodeURIComponent(url)}`); 
            setSearchResults(response.data); 
        } catch (error) {
            console.error("Error fetching products:", error);
            setError("Error fetching products");
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };

    const filteredProducts = (products) => {
        if (selectedCategory === "phone") {
            return products.filter(product => product.title.toLowerCase().includes("phone"));
        } else if (selectedCategory === "Watches") {
            return products.filter(product => product.title.toLowerCase().includes("watch"));
        }
        return products; 
    };

    return (
        <div className="container my-5">
            {/* Navbar with category selection */}

            <div className="text-center mb-5">
                <h1 className="display-4 font-weight-bold">Welcome to Our Site!</h1>
                <p className="lead">
                    Discover amazing deals on the best products curated just for you.
                </p>

                {/* Search Input Section */}
                <div className="input-group mb-2 w-75 mx-auto">
                    <div className="position-relative w-75">
                        <input
                            type="text"
                            className={`form-control form-control-md ps-4 pe-5 py-3 border rounded-5 ${error ? "is-invalid" : ""}`}
                            placeholder="Search for products brand or more"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        {url && (
                            <button
                                className="btn position-absolute top-50 end-0 translate-middle-y bg-transparent border-0 text-secondary pe-3"
                                onClick={() => setUrl("")} 
                                style={{ fontSize: "24px", lineHeight: 0, padding: "0" }}
                            >
                                ×
                            </button>
                        )}
                    </div>
                    <button
                        className="btn btn-dark ms-2 border rounded-5 btn-md px-4 py-0"
                        onClick={findRelatedProducts}
                    >
                        Search
                    </button>
                    {error && <div className="text-danger ms-3 m-2">{error}</div>}
                </div>
            </div>

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : error ? (
                <div className="text-danger text-center">{error}</div>
            ) : (
                <>
                    {/* Display Search Results */}
                    {searchResults.length > 0 ? (
                        <div>
                            <h2 className="text-center mb-4">Search Results</h2>
                            <div className="row">
                                {searchResults.map((product) => (
                                    <Products key={product._id} product={product} />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Most Recent Products */}
                            <h2 className="text-center mb-4">Most Recent Products</h2>
                            <div className="row">
                                {filteredProducts(productsData.mostRecent).length > 0 ? (
                                    filteredProducts(productsData.mostRecent).map((product) => (
                                        <Products key={product._id} product={product} />
                                    ))
                                ) : (
                                    <div className="text-center">No recent products available</div>
                                )}
                            </div>

                            {/* Most Visited Products */}
                            <h2 className="text-center mb-4">Most Visited Products</h2>
                            <div className="row">
                                {filteredProducts(productsData.mostVisited).length > 0 ? (
                                    filteredProducts(productsData.mostVisited).map((product) => (
                                        <Products key={product._id} product={product} />
                                    ))
                                ) : (
                                    <div className="text-center">No visited products available</div>
                                )}
                            </div>

                            
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default HomePage;
