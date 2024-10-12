import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
// import 'animate.css'; // Import animate.css for animations (removed)

const Checkout = () => {
  const [shippingOption, setShippingOption] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Shipping Details Submitted:", {
      shippingOption,
      // You can add more details as needed
    });
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-lg">
        <Card.Body>
          <h2 className="text-center mb-4">Shipping Details</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group controlId="formAddress">
                  <Form.Label>Shipping Address</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Enter your address" required />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={12}>
                <h4>Select Your Eco-Friendly Shipping Option</h4>
                {["Electric Vehicle", "Bicycle", "Standard", "Slow"].map(option => (
                  <Form.Check
                    type="radio"
                    key={option}
                    label={
                      <>
                        {/* The icon for selected shipping option is removed */}
                        {option === "Electric Vehicle" && "Electric Vehicle Delivery (Low Emission) - 1-2 Days - ₹499"}
                        {option === "Bicycle" && "Bicycle Delivery (Zero Emission) - 2-3 Days - ₹299"}
                        {option === "Standard" && "Standard Shipping (3-5 Days) - Free"}
                        {option === "Slow" && "Slow Delivery (Eco-Friendly, 5-7 Days) - ₹150"}
                      </>
                    }
                    value={option}
                    checked={shippingOption === option}
                    onChange={(e) => setShippingOption(e.target.value)}
                    className="mb-2" // Removed the animation class
                  />
                ))}
              </Col>
            </Row>
            <Button variant="primary" type="submit" className="mt-3 w-100">
              Confirm Shipping Details
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Checkout;
