import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookOnline.css';



// Asserts of the Benifits of child 
import ChildBenifit1 from '../../assets/parent-01.png'
import ChildBenifit2 from '../../assets/parent-02.png'
import ChildBenifit3 from '../../assets/parent-03.png'
import ChildBenifit4 from '../../assets/parent-04.png'
import PricingSec from '../../Component/PricingSec/PricingSec';

const BookOnline = () => {
  const navigate = useNavigate();
  
    const handelbuyquick = () => {
      navigate('/signup');
    };
    const handelhome = () => {
      navigate('/');
    };
  return (
    <>

<div className="hero-container">
      <div className="Book-hero-content">
        <h1>Welcome To Our All Study</h1>
        <h2>Best For Education</h2>
        <p>Better Education For Better World</p>
        <div className="hero-buttons">
          <button className="btn read-more" onClick={handelhome}>Read More</button>
          <button className=" book-buy-now" onClick={handelbuyquick}>Buy Now</button>
        </div>
      </div>
    </div>


    
<PricingSec />

<section className="embark-section">
      <div className="embark-container">
        <h1 className="embark-heading">
          How it <span>works</span>
        </h1>
        <hr className="embark-line" />
        <div className="embark-content">
          <div className="embark-left">
            <h2>
              Embark on your <br />
              <span>internship adventure:</span>
            </h2>
            <p>A step-by-step journey</p>
          </div>
          <div className="embark-right">
            <p>
              Welcome to our comprehensive guide on how to embark on your
              internship journey abroad! This page outlines the step-by-step
              process, from application to becoming a valued member of our
              alumni network. Whether you're just starting to explore internship
              opportunities or ready to dive in, this guide will provide all the
              information you need to navigate your way to a successful
              internship experience abroad.
            </p>
          </div>
        </div>
      </div>
    </section>


    <section className="benefits-section">
      <h2 className="benefits-title">Benefits for your child</h2>
      <div className="benefits-container">
        <div className="benefit-item">
          <img src={ChildBenifit1} alt="Guaranteed Internship" className="benefit-image" />
          <h3 className="benefit-heading">Guaranteed internship</h3>
          <p className="benefit-description">
            We promise a meaningful placement, matched to your child's academic focus and career aspirations. Our diligent process ensures they gain hands-on experience in a field they're passionate about, laying a solid foundation for their professional journey.
          </p>
        </div>
        <div className="benefit-item">
          <img src={ChildBenifit2} alt="Visa Assistance" className="benefit-image" />
          <h3 className="benefit-heading">Visa Assistance</h3>
          <p className="benefit-description">
            Navigating visa requirements can be tricky, but we're here to help. Our team provides comprehensive support, from application to approval, so your child can embark on their international internship with confidence and ease.
          </p>
        </div>
        <div className="benefit-item">
          <img src={ChildBenifit3} alt="Your Child's Safety" className="benefit-image" />
          <h3 className="benefit-heading">Your Child's Safety</h3>
          <p className="benefit-description">
            Your child's well-being is paramount. We offer a secure environment, complete with local support and clear communication channels, ensuring a safe and enriching experience abroad.
          </p>
        </div>
        <div className="benefit-item">
          <img src={ChildBenifit4} alt="Academic Credit" className="benefit-image" />
          <h3 className="benefit-heading">Academic Credit</h3>
          <p className="benefit-description">
            Maximizing the value of the internship, we coordinate with educational institutions to potentially earn academic credits, bridging the gap between theory and practice and enhancing your child's academic profile.
          </p>
        </div>
      </div>
    </section>


    </>
  );
};

export default BookOnline;
