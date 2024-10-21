import React, { useState } from "react";
import flipkarLogo from "../../assets/flipkart_logo.png";
import ProductChart from "../ProductChart/ProductChart";

const ProductDetails = ({ product, recheckProductValue }) => {
  const [showModal, setShowModal] = useState(false);

  const formatNumberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const highestPrice = () => {
    return Math.max(...product.priceHistory.map((entry) => entry.price));
  };

  const lowestPrice = () => {
    return Math.min(...product.priceHistory.map((entry) => entry.price));
  };

  const averagePrice = () => {
    const total = product.priceHistory.reduce((sum, entry) => sum + entry.price, 0);
    const avg = Math.round(total / product.priceHistory.length); // Round to nearest whole number
    return formatNumberWithCommas(avg); // Format with commas
  };

  return (
    <div className="product-container container my-5">
      <div className="row">
        <div className="col-md-4 productImageContainer mb-4 mb-md-0">
          <img
            id="productImage"
            src={product.imageUrl}
            alt={product.title}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-8 product-details">
          <h2 id="productName" className="mb-3">
            {product.title}
          </h2>

          <div className="rating-container d-flex align-items-center mb-3">
            <span className="marketplace-logo me-2">
              <img src={flipkarLogo} alt="Flipkart" height="20" />
            </span>
            <span className="product-rating me-3">
              <span className="bg-secondary text-white p-1 rounded">
                {product.overallReview}
              </span>
            </span>
          </div>

          <div className="price-container mb-3">
            <span className="product-current-price fs-3 fw-bold me-2">
              ₹{formatNumberWithCommas(product.currentPrice)}
            </span>
            <p className="product-mrp mb-0">
              Highest Price: <span className="mrp">₹{formatNumberWithCommas(highestPrice())}</span>
            </p>
            <div id="lastUpdated" className="text-muted small">
              <span>
                Last updated:{" "}
                {formatDate(
                  product.priceHistory[product.priceHistory.length - 1].date
                )}
              </span>
              <span className="info-icon ms-2" onClick={() => setShowModal(true)}>
                <i className="fa fa-info-circle" aria-hidden="true">
                  i
                </i>
              </span>
            </div>
          </div>

          <div className="price-stats row mb-4">
            <div className="col-6 col-sm-3 mb-2">
              <span className="stat-label d-block text-muted">
                Current price
              </span>
              <div id="currentPrice" className="stat-price fw-bold">
                ₹{formatNumberWithCommas(product.currentPrice)}
              </div>
            </div>
            <div className="col-6 col-sm-3 mb-2">
              <span className="stat-label d-block text-muted">Lowest price</span>
              <div id="lowestPrice" className="stat-price fw-bold">
                ₹{formatNumberWithCommas(lowestPrice())}
              </div>
            </div>
            <div className="col-6 col-sm-3 mb-2">
              <span className="stat-label d-block text-muted">Average price</span>
              <div id="averagePrice" className="stat-price fw-bold">
                ₹{averagePrice()}
              </div>
            </div>
            <div className="col-6 col-sm-3 mb-2">
              <span className="stat-label d-block text-muted">Highest price</span>
              <div id="highestPrice" className="stat-price fw-bold">
                ₹{formatNumberWithCommas(highestPrice())}
              </div>
            </div>
          </div>

          <div>
            <a
              href={product.url}
              target="_blank"
              id="buyNowButton"
              className="btn btn-primary mx-2 buy-now-button"
            >
              <span className="marketplace-logo me-2">
                <img src={flipkarLogo} alt="Flipkart" height="20" />
              </span>
              Buy on Flipkart
            </a>
            <button
              className="btn btn-dark mx-2 recheck-button"
              onClick={recheckProductValue}
            >
              Recheck Price
            </button>
          </div>
        </div>
        
        {/* Added margin for Product Description */}
        <div className="mb-4 mt-4">
          <h4>Product Description</h4>
          <p>{product.description}</p>
        </div>

        <div className="mb-4">
          <h4>Price History Graph</h4>
          <div>
            {product && (
              <div className="mt-5">
                <ProductChart priceHistory={product.priceHistory} />
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Disclaimer</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Please note that product prices and availability may change over time. The prices and availability information displayed on the store website Flipkart at the time of purchase will be considered accurate for the purchased products.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
