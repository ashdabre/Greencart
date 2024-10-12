import React, { useState } from "react";
// import './FootprintCalculator.css';
import './footprintcalci.css'; // Ensure you have this CSS file

function FootprintCalculator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    country: "",
    onlineShopping: "",
    vehicleUsage: "",
    foodDelivery: "",
    plasticBottles: "",
  });
  
  const [calculatedResult, setCalculatedResult] = useState(null); // New state for storing the result

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // This function will handle the calculation logic
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple footprint calculation based on the number of plastic bottles (you can refine this logic)
    const plasticFootprint = formData.plasticBottles * 1.5; // Example: 1 bottle = 1.5kg CO2 (you can adjust this)

    // Set the calculated result to be displayed
    setCalculatedResult({
      country: formData.country,
      plasticFootprint,
    });
  };

  return (
    <div className="calculator-container">
      {calculatedResult ? (
        // If calculatedResult exists, show the result
        <div className="result-section">
          <h1>Your Estimated Footprint</h1>
          <p>
            Based on your inputs, your estimated carbon footprint related to plastic bottle usage is approximately:
          </p>
          <h2>{calculatedResult.plasticFootprint} kg CO2 per week</h2>
          <p>Country: {calculatedResult.country}</p>
        </div>
      ) : (
        // Continue showing steps until the result is calculated
        <>
          {step === 1 && (
            <div className="form-section">
              <h1>Country of Residence</h1>
              <p>Select your country of residence to determine average plastic consumption.</p>
              <div className="input-group">
                <select name="country" value={formData.country} onChange={handleChange} className="custom-select">
                  <option value="">Select Country</option>
                  <option value="IN">India</option>
                  <option value="JP">Japan</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                </select>
                <button className="next-button" onClick={nextStep}>→</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-section">
              <h1>Do You Shop Online?</h1>
              <p>Do you make regular purchases online?</p>
              <div className="input-group">
                <select name="onlineShopping" value={formData.onlineShopping} onChange={handleChange} className="custom-select">
                  <option value="">Select Answer</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <button className="next-button" onClick={nextStep}>→</button>
                <button className="prev-button" onClick={prevStep}>←</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-section">
              <h1>Vehicle Usage</h1>
              <p>Do you own a vehicle or use public transport?</p>
              <div className="input-group">
                <select name="vehicleUsage" value={formData.vehicleUsage} onChange={handleChange} className="custom-select">
                  <option value="">Select Answer</option>
                  <option value="car">Own a Car</option>
                  <option value="bike">Own a Bike</option>
                  <option value="public_transport">Public Transport</option>
                  <option value="none">None</option>
                </select>
                <button className="next-button" onClick={nextStep}>→</button>
                <button className="prev-button" onClick={prevStep}>←</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="form-section">
              <h1>Food Delivery Usage</h1>
              <p>Do you frequently order from apps like Zomato or Blinkit?</p>
              <div className="input-group">
                <select name="foodDelivery" value={formData.foodDelivery} onChange={handleChange} className="custom-select">
                  <option value="">Select Answer</option>
                  <option value="often">Often</option>
                  <option value="sometimes">Sometimes</option>
                  <option value="rarely">Rarely</option>
                  <option value="never">Never</option>
                </select>
                <button className="next-button" onClick={nextStep}>→</button>
                <button className="prev-button" onClick={prevStep}>←</button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="form-section">
              <h1>Plastic Bottle Usage</h1>
              <p>How many plastic bottles do you use per week?</p>
              <div className="input-group">
                <input 
                  type="number"
                  name="plasticBottles"
                  value={formData.plasticBottles}
                  onChange={handleChange}
                  className="custom-select"
                  placeholder="Number of Bottles"
                />
                <button className="next-button" onClick={handleSubmit}>Calculate</button>
                <button className="prev-button" onClick={prevStep}>←</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default FootprintCalculator;
