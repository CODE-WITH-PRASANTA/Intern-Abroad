import React from 'react'
import './Employee.css'
import { AiOutlineGlobal } from 'react-icons/ai'; 

// Asserts of the hero section of the intern
import InternHeroImg from '../../assets/Intern-hero-section.png'

import ReasonTopartner from '../../assets/intern-partner.png'
import ReasonTopartner2 from '../../assets/intern-partner-2.png'
import ReasonTopartner3 from '../../assets/intern-partner-3..png'
import ReasonTopartner4 from '../../assets/intern-partner-4.png'

// Asserts of the university colab 
import UniverSityColab1 from '../../assets/university-colab-1.svg'
import UniverSityColab2 from '../../assets/university-colab-2.svg'
import UniverSityColab3 from '../../assets/university-colab-3.svg'
import UniverSityColab4 from '../../assets/university-colab-4.svg'
import UniverSityColab5 from '../../assets/university-colab-5.svg'
import UniverSityColab6 from '../../assets/university-colab-6.svg'



const Employee = () => {
  
 
        const benefitsData = [
          {
            img: ReasonTopartner,
            title: 'Conserve your resources',
            description: 'Reduce time and cost spent on talent acquisition.',
          },
          {
            img: ReasonTopartner2,
            title: 'Globalized workforce',
            description: 'Gain unique skill sets and dynamic international perspectives.',
          },
          {
            img: ReasonTopartner3,
            title: 'Interns culture adaption',
            description: 'InternflyAbroad takes responsibility for the interns well being, ensuring their stay in Asia goes smoothly.',
          },
          {
            img: ReasonTopartner4,
            title: 'No extra responsibility',
            description: 'The interns accommodation, and other personal expenses are covered by the student and arranged by InternflyAbroad.',
          },
        ];
      
       
        const items = [
          'National University of Singapore (#1 ranked university in Asia)',
          'University of Hull (UK’s top university for graduate employability)',
          'IPE Management School (Premier business school in France)',
          'Fachhochschule der Wirtschaft (One of the first private universities in Germany)',
        ];
        
  return (
    <>
    <div>
         <div className="intern-container">
              {/* Hero Section */}
              <div className="intern-hero-section">
                <img src={InternHeroImg} alt="intern Partnership" className="intern-hero-image" />
              </div>
        
              {/* Content Section */}
              <div className="content-section">
                {/* Left Section */}
                <div className="intern-title-section">
                  <h1 className="intern-title">
                    <span className="intern-title-intern">Hire</span>
                    <span className="intern-title-partnership">Interns</span>
                  </h1>
                  <div className="intern-title-line"></div>
                </div>
        
                {/* Right Section */}
                <div className="description-section">
                  <p className="intern-description">
                  InternflyAbroad has many talented students coming through our program, who are eager to gain international experience. Global students for a globalized workforce.
                  </p>
                </div>
              </div>
            </div>
    </div>

    
    <div className="belief-section">
      {/* Top Border */}
      <div className="top-border"></div>

      {/* Content */}
      <div className="belief-content">
        <h2 className="belief-title">
        Hi <span className="highlighted-text">Employers!</span><span className="highlighted-text">...</span>
        </h2>
        <p className="belief-paragraph">
        InternflyAbroad strictly recruits highly-ranked students from top universities across the globe, with outstanding academic performances, and who partake in extracurricular activities. Our applicants are eager to gain first-hand experience on an international scale during their internship abroad.
        </p>
        <p className="belief-paragraph">
        We conduct an initial interview with the intern, where we learn more about their goals and objectives of pursuing an internship. Whenever we have a candidate that matches your company profile and qualifications, we will contact you and provide you with additional information. You are able to set an actual interview with the intern and select the candidate that is the right fit for your organization.
        </p>
      </div>
    </div>
    
    <div className="belief-section">
      {/* Content */}
      <div className="belief-content">
        <h2 className="belief-title">
        First class <span className="highlighted-text">Guarantee</span><span className="highlighted-text">...</span>
        </h2>
        <p className="belief-paragraph">
        Within the short amount of time we have been operating, InternflyAbroad has been placing hundreds of interns in first-class multinational companies, startups and NGOs in all of our twelve destinations: Thailand, Japan, Singapore, South Korea, Hong Kong, China, Malaysia, Indonesia, Vietnam, Australia, Taiwan and Russia across all industry sectors.In each program destination, InternflyAbroad has extensive networks in business, NGOs, and the government.
        </p>
      </div>
    </div>
    <div className="belief-section">
      {/* Content */}
      <div className="belief-content">
        <h2 className="belief-title">
        Why <span className="highlighted-text">Intern Aborad</span><span className="highlighted-text">?</span>
        </h2>
        <p className="belief-paragraph">
        At InternflyAbroad, we are committed to creating the most prestigious experience, which will be mutually beneficial and valuable for both interns and host companies. As a partner with InternflyAbroad, you will be receiving motivated interns and will not have to worry about the hassle around the logistics. InternflyAbroad organizes all the logistic aspects including intern’s visa documentation, accommodation, and airport pickup, as well as making sure that the interns are prepared through our comprehensive orientation.
        </p>
      </div>
    </div>

    
    <div className="benefits-section">
        <div className="Full-benifit-section">
      <h2>
      Reasons<span className="highlight">to partner with us</span>
      </h2>
      <div className="benefits-grid">
        {benefitsData.map((benefit, index) => (
          <div className="benefit-card" key={index}>
            <img src={benefit.img} alt={benefit.title} className="benefit-img" />
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </div>
        ))}
      </div>
      </div>
    </div>

  <div className="university-partners-section">
      <h2 className="university-partners-title">University Partners</h2>
      <div className="university-logos">
        <img src={UniverSityColab1} alt="University Partner 1" />
        <img src={UniverSityColab2} alt="University Partner 2" />
        <img src={UniverSityColab3} alt="University Partner 3" />
        <img src={UniverSityColab4} alt="University Partner 4" />
        <img src={UniverSityColab5} alt="University Partner 5" />
        <img src={UniverSityColab6} alt="University Partner 6" />
      </div>
    </div>

    <div className="form-container">
  <h1>
    Company <span className="highlight">information</span>
  </h1>
  <form
    className="university-form"
    onSubmit={async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);

      // Replace 'YOUR_ACCESS_KEY_HERE' with your Web3Forms access key
      formData.append("access_key", "2c834a6b-7db3-478f-b16d-e6589f2f88f9");

      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: json,
        });

        const result = await response.json();
        if (result.success) {
          alert("Form submitted successfully!");
        } else {
          alert("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Error submitting form. Please check your network connection.");
      }
    }}
  >
    <div className="form-row">
      <div className="form-group">
        <label>Company name*</label>
        <input type="text" name="company_name" placeholder="Company name" required />
      </div>
      <div className="form-group">
        <label>Company website*</label>
        <input type="url" name="company_website" placeholder="Website.com" required />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>Contact first name*</label>
        <input type="text" name="first_name" placeholder="First name" required />
      </div>
      <div className="form-group">
        <label>Contact last name*</label>
        <input type="text" name="last_name" placeholder="Last name" required />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>Contact email*</label>
        <input type="email" name="email" placeholder="Email@gmail.com" required />
      </div>
      <div className="form-group">
        <label>Contact phone*</label>
        <input type="tel" name="phone" placeholder="021 000 0000" required />
      </div>
    </div>

    <div className="form-group">
      <label>Additional information about Company*</label>
      <textarea name="message" placeholder="Type your message..." rows="4" required></textarea>
    </div>

    <div className="form-footer">
      <button type="submit">Submit</button>
    </div>
  </form>
</div>



    <div className="whats-included">
      <h2>
      Our <span className="highlight">track record</span>
      </h2>
      <div className="included-items">
        {items.map((item, index) => (
          <div className="item" key={index}>
            <AiOutlineGlobal className="icon" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>

    
{/* Inhighlight Section */}

<div className="insights-section">
    <div className="full-subscribe-content">
  <div className="insights-content">
    <h2>Get New Insights Weekly</h2>
    <p>
      Contact us today to kick-start your project and experience the power of
      transformative digital solutions.
    </p>
  </div>
  <div className="insights-form">
    <input
      type="email"
      placeholder="Email Your Address"
      className="email-input"
    />
    <button className="subscribe-button">Subscribe➤</button>
  </div>
    </div>
</div>



    </>
  )
}

export default Employee