import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Home.css';

// Assets for the home-hero-section
import HeroBannerImage from '../../assets/Hero-Main-Img.png';
import TajmahalImageBg from '../../assets/Tagmahal-hero-img.png';

///Our Partners Image 
import DisnepLogo from '../../assets/Disnep-logo.png'
import UberLogo from '../../assets/Uber-Logo.svg'
import GenslerLogo from '../../assets/Gensler-Logo.svg'
import WestinLogo from '../../assets/Westin-Logo.svg'
import OmanAir from '../../assets/Oman-ir-Logo.png'
import AmnestyInternational from '../../assets/Amnesty-logo.svg'

// Expand Your Knowledge Section Asserts
import GrpInternSection from '../../assets/Grp-Interns.jpg'

import Rotation from '../../Component/Rotaion/Rotaion';


//Asserts For added places 
import spain from '../../assets/spain.jpg'
import Thyland from '../../assets/Thyland.jpg'
import Singapur from '../../assets/Singapur.jpg'
import Japan from '../../assets/Japan.jpg'
import Indonesia from '../../assets/Indonesia.jpg'


///MultiCountry Advantage
import MultiCountryImg from '../../assets/Multi-Country-img.svg'


///Asserts Fot the Experiance Section
import WorldLogo from '../../assets/World-logo.png'
import Devlopment from '../../assets/Devlopment-logo.png'
import GlobalNetworkLogo from '../../assets/Global-logo.png'
import ResumeLogo from '../../assets/Resume-logo.png'
import HomeTeam from "../../Component/HomeTeam/HomeTeam";


const Home = () => {
  const navigate = useNavigate();

  const handelstartjourney = () => {
    navigate('/signup');
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const places = [
    { name: "Spain", image: spain },
    { name: "Thailand", image: Thyland },
    { name: "Singapore", image: Singapur },
    { name: "Japan", image: Japan },
    { name: "Indonesia", image: Indonesia },
  ];

  const experiences = [
    {
      logo: WorldLogo,
      title: "Explore the World",
      description:
        "Discover new opportunities and gain valuable experience through our Internship Abroad program. Expand your horizons and immerse yourself in different cultures while enhancing your skills and knowledge.",
    },
    {
      logo: Devlopment,
      title: "Professional Development",
      description:
        "Enhance your skills and knowledge through our Training Abroad program. Gain hands-on experience, learn from industry experts, and acquire valuable certifications to boost your career prospects.",
    },
    {
      logo: GlobalNetworkLogo,
      title: "Global Network",
      description:
        "With our Job Abroad program, you can take your career to new heights by working in international companies. Gain a global perspective, develop cross-cultural skills, and build a strong professional network.",
    },
    {
      logo: ResumeLogo,
      title: "Optimized Resumes",
      description:
        "Stand out from the competition with our ATS Resume Writing service. Our expert writers will optimize your resume to ensure it gets noticed by employers and increases your chances of landing your dream job.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % places.length);
    },2000); // Change every 6 seconds
    return () => clearInterval(interval);
  }, [places.length]);




  return (
    <>
    <div className="home-hero-section">
      <div className="home-hero-content">
        <h1>Internships Abroad<span>with a Purpose</span></h1>
        <h2>Our Mission </h2>
        <p>
        We educate students to become global leaders through premier study abroad and internship programs, which offer students worldwide experiential learning opportunities that meet the highest standards of academic quality.
        When you secure an international internship. you open doors to the possibility of academic ,acceleration, resume and networking building, language learning, and cultural immersion into a whole new local community.
        </p>
        <button className="hero-button" onClick={handelstartjourney}>Start Your Journey</button>
      </div>
      <img src={HeroBannerImage} alt="Hero" className="hero-main-image" />
      <img src={TajmahalImageBg} alt="Taj Mahal" className="hero-background-image" />
    </div>


    {/* Our Partner Section */}
    <div className="partners-section">
        <h2 className="partners-heading">Our Partners</h2>
        <div className="partners-logos">
          <img src={DisnepLogo} alt="Disney" />
          <img src={UberLogo} alt="Uber" />
          <img src={GenslerLogo} alt="Gensler" />
          <img src={WestinLogo} alt="Westin Hotels" />
          <img src={OmanAir} alt="Oman Air" />
          <img src={AmnestyInternational} alt="Amnesty International" />
        </div>
      </div>

      {/* Expand Your Knowledge */}
      <div className="expand-knowledge-section">
      <div className="expand-knowledge-container">
        <div className="image-container">
          <img src={GrpInternSection} alt="Group of Interns" className="knowledge-image" />
        </div>
        <div className="content-container">
          <h2 className="section-heading">EXPAND YOUR KNOWLEDGE AND EXPLORE THE WORLD WITH <span>INTERNFLY ABROAD</span></h2>
          <p className="description">
            We take away the stress of securing a great international internship.
          </p>
          <p className="details">
            Internsflyabroad is committed to providing students with an outstanding educational experience overseas. 
            We offer affordable internships in various parts of the world that help you gain valuable experience in your 
            chosen field. Our mission is to provide you with a unique opportunity to not only learn from experts in your 
            field but also gain cultural experience that will broaden your perspectives. 
            Our programs are designed to equip you with the necessary skills that will prepare you to meet the demands of the global job market.
          </p>
        </div>
      </div>
    </div>

   
{/* Multi Country Section */}
    <div className="multi-country-section">
      <div className="multi-country-content">
        <h2><span>InternsFlyabroad's</span> Multi Country Advantage</h2>
        <p className="subheading">The World is your Campus!</p>
        <p className="description">
          Aspire for more. Choose what suits you the best from 800+ global universities in 33 countries, world over. The choices and opportunities our universities offer are endless!
        </p>
        <button
          className="explore-button"
          onClick={() => window.location.href = '/studyzone'}
        >
          Explore Countries
        </button>
      </div>
      <div className="multi-country-images">
        <img src={MultiCountryImg} alt="Multi Country Advantage" className="country-img" />
      </div>
    </div>


    <Rotation />

    {/* Experiance the whole world */}
    <section className="experience-section">
      <div className="experience-grid">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-card">
            <img src={exp.logo} alt={`${exp.title} logo`} className="experience-logo" />
            <h3 className="experience-title">{exp.title}</h3>
            <p className="experience-description">{exp.description}</p>
          </div>
        ))}
      </div>
      <div className="experience-footer">
        <p>
          At <strong>Internsflyabroad</strong>, we are committed to providing exceptional services
          that cater to your unique needs. Contact us today to learn more about our programs and
          start your journey toward a successful future.
        </p>
        <button className="get-started-button" onClick={handelstartjourney}>Get Started</button>
      </div>
    </section>
    
    
  {/* Our Story Section */}
  <div className="Home-Team-section">
  <div className="story-section">
    <h1 className="story-heading">Our Story</h1>
    <h2 className="story-subheading">Gain practical experience | Discover your potential | Accelerate your career.</h2>
    <p className="story-description">
      Explore a new part of the world while developing your career. InternsFlyAbroad was established in 2017, where 4 youth across seven countries 
      had a dream of building cross-cultural understanding across nations. They hoped to change the world, one person and one internship at a time.
    </p>
  </div>

 <div className="intern-section">
      <h2>
        Where do you want to intern <span className="highlight">Abroad?</span>
      </h2>
      <p className="subtitle">
        Take an adventure to Asia-Pacific or even Europe! Your Internship, Your
        Choice - From bustling metropolises to serene historical towns, we've
        got something for everyone!
      </p>
      <div className="places-grid">
        {places.map((place, index) => (
          <div
            key={index}
            className={`place-card ${
              index === activeIndex ? "active" : ""
            }`}
          >
            <img src={place.image} alt={place.name} className="place-image" />
            <div className="place-name">{place.name}</div>
          </div>
        ))}
      </div>
    </div>
<HomeTeam />
</div>


    </>
  );
};

export default Home;
