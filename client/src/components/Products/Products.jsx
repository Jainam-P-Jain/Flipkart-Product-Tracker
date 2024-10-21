import React from "react";
import { Link } from "react-router-dom";
import "./Products.css";
import fullStar from "../../assets/full_star.png";
import emptyStar from "../../assets/empty_star.png";
import halfStar from "../../assets/half_star.png";
import { useParams } from "react-router-dom";

const truncateTitle = (title, maxLength) => {
  return title.length > maxLength
    ? `${title.substring(0, maxLength)}...`
    : title;
};

const Products = ({ product }) => {
  const truncatedTitle = truncateTitle(product.title, 25);
  
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <img
          key={`full-${i}`}
          src={fullStar}
          height={20}
          alt="full star"
          className="star-icon"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <img
          key={`half`}
          src={halfStar}
          height={20}
          alt="half star"
          className="star-icon"
        />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <img
          key={`empty-${i}`}
          src={emptyStar}
          height={20}
          alt="empty star"
          className="star-icon"
        />
      );
    }
    return stars;
  };

  return (
    <div className="col-md-3 mb-4">
      {/* Wrap the entire product card in a Link */}
      <Link to={`/product/${product._id}`} className="text-decoration-none">
        <div className="product-card">
          <div className="product-image-wrapper">
            <img
              src={product.imageUrl}  
              className="product-image"
              alt={product.title}
              onError={(e) => { e.target.src = 'path_to_default_image.jpg'; }} 
            />
            <div className="product-overlay">
              <button className="btn btn-light btn-sm quick-view-btn">
                <i className="bi bi-eye"></i> View
              </button>
            </div>
          </div>
          <div className="product-details">
            <h5 className="product-title" title={product.title}>
              {truncatedTitle}
            </h5>
            <div className="product-rating">
              <div className="stars">{renderStars(parseFloat(product.overallReview) || 0)}</div> 
              <span className="rating-number">({product.overallReview ? product.overallReview : 'No rating'})</span>
            </div>
            <div className="product-price">
              ₹{product.currentPrice ? product.currentPrice.toLocaleString() : 'N/A'}{/* Price is now bold */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Products;
