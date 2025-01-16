import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Utils/Api';
import './OurService.css';

// Assets for the components
import RightService from '../../assets/Serices-Img.svg';
import CountryIcon from '../../assets/whyib-icon-1.svg';
import Supporticon from '../../assets/whyib-icon-2.svg';
import SpeakVolumeIcon from '../../assets/whyib-icon-3.svg';

const OurService = () => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate('/internform');
  };
  const handelenquiry = () => {
    navigate('/contact');
  };
  const [pricingData, setPricingData] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [error, setError] = useState('');

  const handlePlanSelection = (planId) => {
    setSelectedPlan(planId);
  };

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const response = await axiosInstance.get('/pricing');
        setPricingData(response.data);
      } catch (error) {
        console.error('Error fetching pricing data:', error);
        setError('Failed to load pricing data. Please try again later.');
      }
    };
    fetchPricingData();
  }, []);

  return (
    <>
      <div className="services-container">
        <div className="service-full-container">
          <div className="services-content">
            <p className="services-category">
              Services <span className="dot">•</span> For Students
            </p>
            <h1 className="services-title">Study in the global university of your choice!</h1>
            <p className="services-description">
              Thousands of our students are pursuing their programs and aspirations in
              eminent universities globally and KC welcomes you to pursue yours!
            </p>
            <button className="enquire-button" onClick={handelenquiry}>Enquire Now</button>
          </div>
          <div className="services-image">
            <img src={RightService} alt="Student" />
          </div>
        </div>
      </div>

      <div className="why-kc-container">
        <h2 className="why-kc-title">Why Intern Abroad?</h2>
        <div className="why-kc-cards">
          <div className="why-kc-card">
            <img src={CountryIcon} alt="Countries Icon" className="why-kc-icon" />
            <h3 className="why-kc-card-title">33 Countries & 850+ University Tie-ups</h3>
            <p className="why-kc-card-description">
              The choices are endless and we are there to suggest to you what suits you the most.
            </p>
          </div>
          <div className="why-kc-card">
            <img src={Supporticon} alt="Support Icon" className="why-kc-icon" />
            <h3 className="why-kc-card-title">Supporting you all the way</h3>
            <p className="why-kc-card-description">
              From the day you consult us till the day you land in your dream university, we will
              support you all the way and by all means!
            </p>
          </div>
          <div className="why-kc-card">
            <img src={SpeakVolumeIcon} alt="Numbers Icon" className="why-kc-icon" />
            <h3 className="why-kc-card-title">Our numbers speak volumes</h3>
            <p className="why-kc-card-description">
              The year 2020 saw 5000 of our students enrolling in their dream universities.
            </p>
          </div>
        </div>
      </div>

      <div className="service-container">
        <h1>Choose Your Pricing Plan</h1>
        <p>Explore our flexible pricing options and select the one that suits your needs best.</p>
        {error && <p className="error-message">{error}</p>}
        <div className="service-plans">
          {pricingData.length > 0 ? (
            pricingData.map((plan) => (
              <div
                key={plan._id}
                className={`plan-card ${selectedPlan === plan._id ? 'selected' : ''}`}
                onClick={() => handlePlanSelection(plan._id)}
              >
                <h2>{plan.title}</h2>
                <p>{plan.facility}</p>
                <ul className="feature-list">
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <h3>₹{plan.pricing}</h3>
                <p className="valid-duration">Valid for {plan.validTime}</p>
                {plan.yearlySave && <p className="discount">Save ₹{plan.yearlySave}/year (save 15%)</p>}
                <button className="btn-buy"   onClick={handleBuyNow}>Buy Now</button>
                <p className="footnote">{plan.footerFacility}</p>
              </div>
            ))
          ) : (
            <p>Loading pricing plans...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default OurService;
