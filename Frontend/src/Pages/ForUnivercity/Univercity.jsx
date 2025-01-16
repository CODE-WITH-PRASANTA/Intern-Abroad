import React from 'react';
import './University.css';
import UniversityHeroImg from '../../assets/ForUnivercity-Heading.png';
import { AiOutlineGlobal } from 'react-icons/ai';

// Assets
import Benifit1 from '../../assets/Benifit-1.png';
import Benifit2 from '../../assets/Benifit-2.png';
import Benifit3 from '../../assets/Benifit-3.png';
import Benifit4 from '../../assets/Benifit-4.png';
import UniverSityColab1 from '../../assets/university-colab-1.svg';
import UniverSityColab2 from '../../assets/university-colab-2.svg';
import UniverSityColab3 from '../../assets/university-colab-3.svg';
import UniverSityColab4 from '../../assets/university-colab-4.svg';
import UniverSityColab5 from '../../assets/university-colab-5.svg';
import UniverSityColab6 from '../../assets/university-colab-6.svg';

const Univercity = () => {
  const items = [
    'Visa assistance',
    'Safe and furnished accommodation near their workplace',
    '24/7 emergency assistance',
    'Preloaded transportation card (for the first month)',
    'Networking events and panel discussions organized by InternflyAbroad',
    'Language and culture courses',
    'Certification from their host company',
    'Domestic SIM card',
    'Airport pick-up at arrival',
    'CV/Resume enhancement',
    'Pick-up and drop-off from their apartment to their workplace on their first day',
  ];

  const benefitsData = [
    {
      img: Benifit1,
      title: 'Professional Networking',
      description: 'Long-standing and trusted relationships with our network of partner companies.',
    },
    {
      img: Benifit2,
      title: 'Top University Partnerships',
      description: 'We’re proud to have established partnerships with top universities around the globe.',
    },
    {
      img: Benifit3,
      title: 'Employment Success',
      description: 'Many of our InternflyAbroad alumni have secured full-time job opportunities upon completion of their internships.',
    },
    {
      img: Benifit4,
      title: 'Personal Development',
      description: 'Through our program, your students will not only develop professionally but also grow on a personal level.',
    },
  ];

  const stats = [
    { number: '800+', text: 'Applicants served Annually' },
    { number: '2000+', text: 'Partner companies' },
    { number: '80+', text: 'Leading partner universities worldwide' },
    { number: '95%', text: 'Program completion rate' },
  ];

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append('access_key', '2c834a6b-7db3-478f-b16d-e6589f2f88f9'); // Replace with your Web3Forms access key

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      alert('Form submitted successfully!');
    } else {
      alert('Form submission failed. Please try again.');
    }
  };

  return (
    <>
    <div className="university-container">
      {/* Hero Section */}
      <div className="univercity-hero-section">
        <img src={UniversityHeroImg} alt="University Partnership" className="univercity-hero-image" />
      </div>

      {/* Content Section */}
      <div className="content-section">
        {/* Left Section */}
        <div className="title-section">
          <h1 className="title">
            <span className="title-university">University</span>
            <span className="title-partnership">Partnership</span>
          </h1>
          <div className="title-line"></div>
        </div>

        {/* Right Section */}
        <div className="description-section">
          <p className="university-description">
            If your university is exploring opportunities for an international internship program
            for its students, consider Asia Internship Program (InternflyAbroad) as your solution.
          </p>
        </div>
      </div>
    </div>

    <div className="belief-section">
      {/* Top Border */}
      <div className="top-border"></div>

      {/* Content */}
      <div className="belief-content">
        <h2 className="belief-title">
          We, as <span className="highlighted-text">InternflyAbroad</span>, <span className="highlighted-text">believe...</span>
        </h2>
        <p className="belief-paragraph">
          ...that student development is a complex, fragile matter that should be handled with the utmost care.
          Therefore, since our foundation in Thailand in 2013, we have been striving to create the best educational
          and safe environment possible for ambitious students who want to do an internship in Asia.
        </p>
        <p className="belief-paragraph">
          The ideal formula for such an environment is a combination of carefully selected and monitored host companies.
          In addition, participating individuals will be given the proper resources to grow on a personal and professional
          level outside the workplace.
        </p>
      </div>
    </div>

    
    <div className="whats-included">
      <h2>
        What's <span className="highlight">Included</span>
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


    <div className="benefits-section">
        <div className="Full-benifit-section">
      <h2>
        Benefits <span className="highlight">for your University</span>
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
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <h3>{stat.number}</h3>
            <p>{stat.text}</p>
          </div>
        ))}
      </div>
      </div>
    </div>

      {/* University Information Form Section */}
      <div className="form-container">
        <h1>
          University <span className="highlight">Information</span>
        </h1>
        <form className="university-form" onSubmit={onSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>University name*</label>
              <input type="text" name="university_name" placeholder="University name" required />
            </div>
            <div className="form-group">
              <label>University website*</label>
              <input type="url" name="university_website" placeholder="Website.com" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Contact first name*</label>
              <input type="text" name="contact_first_name" placeholder="First name" required />
            </div>
            <div className="form-group">
              <label>Contact last name*</label>
              <input type="text" name="contact_last_name" placeholder="Last name" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Contact email*</label>
              <input type="email" name="contact_email" placeholder="Email@gmail.com" required />
            </div>
            <div className="form-group">
              <label>Contact phone*</label>
              <input type="tel" name="contact_phone" placeholder="021 000 0000" required />
            </div>
          </div>
          <div className="form-group">
            <label>Additional information*</label>
            <textarea name="additional_info" placeholder="Type your message..." rows="4" required></textarea>
          </div>
          <div className="form-footer">
            <button type="submit">Submit</button>
          </div>
        </form>
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


   </>
  );
};

export default Univercity;
