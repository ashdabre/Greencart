import { useState } from "react";
// import { Col } from "react-bootstrap"; // First import
import { Col, Container, Row, Modal, Button, Card } from "react-bootstrap"; // Second import

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import "./product-details.css";
// import { Col, Container, Row, Modal, Button, Card } from "react-bootstrap";


const ProductDetails = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("carbonFootprint"); 
  const [newReview, setNewReview] = useState({ name: "", review: "", rating: 5, carbonFootprintRating: 5, 
    packagingRating: 5, 
    environmentalImpactRating: 5 });
  const [reviews, setReviews] = useState([
    { name: "John Doe", review: "Great product!", rating: 4.5 , carbonFootprintRating: 4, 
      packagingRating: 5, 
      environmentalImpactRating: 4.5 },
    { name: "Jane Smith", review: "Excellent quality!", rating: 5,carbonFootprintRating: 5, 
      packagingRating: 5, 
      environmentalImpactRating: 5  },
  ]);
  const [showModal, setShowModal] = useState(false);
  
  const [showPackagingModal, setShowPackagingModal] = useState(false); // New state for packaging modal

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAdd = (selectedProduct, quantity) => {
    dispatch(addToCart({ product: selectedProduct, num: quantity }));
    toast.success("Product has been added to cart!");
    setQuantity((prev) => prev + 1);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.review) {
      setReviews([newReview, ...reviews]);
      setNewReview({ 
        name: "", 
        review: "", 
        rating: 5, 
        carbonFootprintRating: 5, 
        packagingRating: 5, 
        environmentalImpactRating: 5 
      });
      setShowModal(false);
      toast.success("Review added successfully!");
    } else {
      toast.error("Please enter a valid name and review!");
    }
  };

  const totalCarbonFootprint = selectedProduct?.carbonFootprint ?? 0;
  const carbonFootprintBreakdown = selectedProduct?.carbonFootprintBreakdown || {
    production: 40,
    packaging: 10,
    transportation: 30,
    usage: 15,
    recycling: 5,
  };
  const packagingDetails = selectedProduct?.packagingDetails || "Eco-friendly packaging, 50% recycled materials.";
  const detailedPackagingInfo = selectedProduct?.detailedPackagingInfo || {
    madeFrom: "50% recycled plastic, 50% biodegradable material",
    ingredients: "Plastic polymers, biodegradable fibers",
    sourcing: "Sustainably sourced materials from certified suppliers",
    recyclingOptions: "Can be recycled with plastics, compostable in industrial composting facilities",
    environmentalImpact: "Reduces plastic waste, lower carbon emissions during production",
  };

  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <img loading="lazy" src={selectedProduct?.imgUrl} alt="" />
          </Col>
          <Col md={6}>
            <h2>{selectedProduct?.productName}</h2>
            <div className="rate">
              <div className="stars">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
              <span>{selectedProduct?.avgRating} ratings</span>
            </div>
            <div className="info">
              <span className="price">${selectedProduct?.price}</span>
              <span>category: {selectedProduct?.category}</span>
            </div>
            <p>{selectedProduct?.shortDesc}</p>

            <input
              className="qty-input"
              type="number"
              placeholder="Qty"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <div className="button-group">
              <button
                aria-label="Add"
                type="button"
                className="add"
                style={{ width: "100%" }}
                onClick={() => handleAdd(selectedProduct, quantity)}
              >
                Add To Cart
              </button>
              <div style={{ margin: "20px 0" }} />
              <button
                aria-label="Buy Now"
                type="button"
                className="add"
                style={{
                  width: "100%",
                  backgroundColor: "lightgrey",
                  marginBottom: "100px",
                }}
                onClick={() => handleAdd(selectedProduct, quantity)}
              >
                Buy Now
              </button>
            </div>
          </Col>
        </Row>

        <div style={{ marginTop: "100px" }}></div>
        {/* Reviews and Modal */}
        <div style={{ marginTop: "100px" }}></div>
        {/* Reviews Section with Horizontal Cards */}
        <div className="reviews" style={{ marginTop: "50px" }}>
          <h3>Customer Reviews</h3>
          <Row className="reviews-row" style={{ overflowX: "auto", whiteSpace: "nowrap", padding: "10px 0" }}>
            {reviews.map((review, index) => (
              <Col
                key={index}
                md={4}
                style={{
                  display: "inline-block",
                  float: "none",
                  textAlign: "center",
                  marginRight: "15px",
                }}
              >
                <Card className="review-card shadow-lg" style={{ transition: "transform 0.3s", cursor: "pointer" }}>
                  <Card.Body>
                    <Card.Title>{review.name}</Card.Title>
                    <Card.Text>{review.review}</Card.Text>
                    <div className="stars">
                      {[...Array(Math.floor(review.rating))].map((_, i) => (
                        <i key={i} className="fa fa-star"></i>
                      ))}
                      {review.rating % 1 !== 0 && <i className="fa fa-star-half-alt"></i>}
                    </div>
                    <p>Carbon Footprint Rating: {review.carbonFootprintRating} / 5</p>
                    <p>Packaging Rating: {review.packagingRating} / 5</p>
                    <p>Environmental Impact Rating: {review.environmentalImpactRating} / 5</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <div style={{ marginTop: "50px", marginBottom: "50px" }}>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Write a Review
          </Button>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Write a Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleReviewSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                required
                style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
              />
              <textarea
                placeholder="Your Review"
                value={newReview.review}
                onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                required
                style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
              />
              <label style={{ display: "block", marginBottom: "10px" }}>General Rating:</label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>

              <label style={{ display: "block", marginBottom: "10px" }}>Rate Carbon Footprint:</label>
              <select
                value={newReview.carbonFootprintRating}
                onChange={(e) => setNewReview({ ...newReview, carbonFootprintRating: Number(e.target.value) })}
                style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>

              <label style={{ display: "block", marginBottom: "10px" }}>Rate Packaging:</label>
              <select
                value={newReview.packagingRating}
                onChange={(e) => setNewReview({ ...newReview, packagingRating: Number(e.target.value) })}
                style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>

              <label style={{ display: "block", marginBottom: "10px" }}>Rate Environmental Impact:</label>
              <select
                value={newReview.environmentalImpactRating}
                onChange={(e) => setNewReview({ ...newReview, environmentalImpactRating: Number(e.target.value) })}
                style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>

              <Button type="submit" variant="primary">
                Submit Review
              </Button>
            </form>
          </Modal.Body>
        </Modal>
        
        {/* Custom Tabs */}
        <div style={{ marginTop: "100px" }}></div>
        <div className="tabs">
          <button
            className={activeTab === "carbonFootprint" ? "active-tab" : ""}
            onClick={() => setActiveTab("carbonFootprint")}
            style={{
              marginRight: "10px",
              padding: "10px",
              fontWeight: activeTab === "carbonFootprint" ? "bold" : "normal",
            }}
          >
            View Carbon Footprint
          </button>
          <button
            className={activeTab === "packagingDetails" ? "active-tab" : ""}
            onClick={() => setShowPackagingModal(true)}  // Open modal on click
            style={{
              padding: "10px",
              fontWeight: activeTab === "packagingDetails" ? "bold" : "normal",
            }}
          >
            Check Packaging Details
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content" style={{ marginTop: "20px" }}>
          {activeTab === "carbonFootprint" && (
            <div className="carbon-footprint">
              <h4>Carbon Footprint</h4>
              <p>
                Total carbon footprint: <strong>{totalCarbonFootprint} kg CO₂</strong>
              </p>
              <div className="carbon-footprint-breakdown">
                <h5>Breakdown</h5>
                <div className="footprint-category">
                  <span>Production: {carbonFootprintBreakdown.production}%</span>
                  <div className="bar">
                    <div className="bar-fill" style={{ width: `${carbonFootprintBreakdown.production}%` }}></div>
                  </div>
                </div>
                <div className="footprint-category">
                  <span>Packaging: {carbonFootprintBreakdown.packaging}%</span>
                  <div className="bar">
                    <div className="bar-fill" style={{ width: `${carbonFootprintBreakdown.packaging}%` }}></div>
                  </div>
                </div>
                <div className="footprint-category">
                  <span>Transportation: {carbonFootprintBreakdown.transportation}%</span>
                  <div className="bar">
                    <div className="bar-fill" style={{ width: `${carbonFootprintBreakdown.transportation}%` }}></div>
                  </div>
                </div>
                <div className="footprint-category">
                  <span>Usage: {carbonFootprintBreakdown.usage}%</span>
                  <div className="bar">
                    <div className="bar-fill" style={{ width: `${carbonFootprintBreakdown.usage}%` }}></div>
                  </div>
                </div>
                <div className="footprint-category">
                  <span>Recycling: {carbonFootprintBreakdown.recycling}%</span>
                  <div className="bar">
                    <div className="bar-fill" style={{ width: `${carbonFootprintBreakdown.recycling}%` }}></div>
                  </div>
                </div>
                
              </div>
            </div>
          )}
        </div>

        {/* Packaging Modal */}
        <Modal show={showPackagingModal} onHide={() => setShowPackagingModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Packaging Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Packaging Details</h4>
            <p><strong>Material:</strong> {detailedPackagingInfo.madeFrom}</p>
            <p><strong>Ingredients:</strong> {detailedPackagingInfo.ingredients}</p>
            <p><strong>Sourcing:</strong> {detailedPackagingInfo.sourcing}</p>
            <p><strong>Recycling Options:</strong> {detailedPackagingInfo.recyclingOptions}</p>
            <p><strong>Environmental Impact:</strong> {detailedPackagingInfo.environmentalImpact}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowPackagingModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </section>
  );
};

export default ProductDetails;
