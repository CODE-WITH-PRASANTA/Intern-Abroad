import React from 'react';
import './StudyZone.css'; // Import the CSS file
import WorldCampus from '../../assets/world_campus-img.png'
import Swal from "sweetalert2"; // Import SweetAlert2
import "sweetalert2/dist/sweetalert2.min.css";


// Our Strength section asserts logo
import GlobalStudy from '../../assets/global_study_logo.svg'
import  UniversityTieUplogo from '../../assets/university_tie_ups_logo.svg'
import SpeakVolumeLogo from '../../assets/speak_vol_logo.svg'


// Asserts Of the USA Section 
import UsaSectionimg1 from '../../assets/Country_USA_01.png'
import UsaSectionimg2 from '../../assets/Country_USA_02.png'
import UsaSectionimg3 from '../../assets/Country_USA_03.svg'
import UsaSectionimg4 from '../../assets/Country_USA_04.png'


// Asserts Of the CANADA Section
import CanadaSectionimg1  from '../../assets/Canada_01.png'
import CanadaSectionimg2  from '../../assets/Canada_02.png'
import CanadaSectionimg3  from '../../assets/Canada_03.png'
import CanadaSectionimg4  from '../../assets/Canada_04.svg'


// Asserts Of the CANADA Section
import UKSectionimg1  from '../../assets/UK_01.png'
import UKSectionimg2  from '../../assets/UK_02.png'
import UKSectionimg3  from '../../assets/UK_03.png'
import UKSectionimg4  from '../../assets/UK_04.png'


// Asserts of the Irland Section
import IrlandSectionimg1 from '../../assets/Ireland_01.png'
import IrlandSectionimg2 from '../../assets/Ireland_02.png'
import IrlandSectionimg3 from '../../assets/Ireland_03.png'
import IrlandSectionimg4 from '../../assets/Ireland_04.png'


// Asserts Of the Austrilia Section
import AustriliaSectionimg1  from '../../assets/Austrilia_01.png'
import AustriliaSectionimg2  from '../../assets/Austrilia_02.svg'
import AustriliaSectionimg3  from '../../assets/Austrilia_03.svg'
import AustriliaSectionimg4  from '../../assets/Austrilia_04.png'


// Asserts of the NZ Section
import NZSectionimg1 from '../../assets/NZ_01.png'
import NZSectionimg2 from '../../assets/NZ_02.png'
import NZSectionimg3 from '../../assets/NZ_03.png'
import NZSectionimg4 from '../../assets/NZ_04.png'


// Asserts of the Irland Section
import EuropeSectionimg1 from '../../assets/Europe_01.png'
import EuropeSectionimg2 from '../../assets/Europe_02.png'
import EuropeSectionimg3 from '../../assets/Europe_03.png'
import EuropeSectionimg4 from '../../assets/Europe_04.png'


// Asserts of the Asia Section
import AsiaSectionimg1 from '../../assets/Asia_01.png'
import AsiaSectionimg2 from '../../assets/Asia_02.png'
import AsiaSectionimg3 from '../../assets/Asia_03.png'
import AsiaSectionimg4 from '../../assets/Asia_04.png'




const StudyZone = () => {

  const handleSearch = () => {
    // Get the selected country from the dropdown
    const selectedCountry = document.querySelector(".country-dropdown").value;

    // Check if a country is selected
    if (selectedCountry) {
      // Scroll to the section with the corresponding ID
      const section = document.getElementById(selectedCountry);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Section not found!",
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "No country selected",
        text: "Please select a country first!",
      });
    }
  };

  const strengthsData = [
    {
      logo: GlobalStudy,
      title: "Global Study Destinations",
      description:
        "33 countries across 2 continents – global study destinations we offer include some of the best countries to study abroad.",
    },
    {
      logo: UniversityTieUplogo,
      title: "University tie-ups",
      description:
        "Choose the program that will define your future from our represented 850+ universities all over the world.",
    },
    {
      logo: SpeakVolumeLogo,
      title: "Our numbers speak volumes",
      description:
        "Leverage the expertise of our seasoned & friendly counsellors who have assisted 5,75,000+ students reach their dream study destinations.",
    },
  ];

  return (
    <>
      <div className="study-zone-container">
        <div className="breadcrumb">
          <span>Home</span> &nbsp;•&nbsp; <span>Study Destinations</span>
        </div>
        <div className="study-content">
          <div className="text-section-study-zone">
            <h1>The World is your Campus!</h1>
            <p>
              Aspire for more. Choose what suits you the best from top
              countries to study for international students, worldwide. The
              choices and opportunities our universities offer are endless!
            </p>
            <button className="cta-button">Get Free Expert Assistance</button>
          </div>
          <div className="image-section">
            <img src={WorldCampus} alt="World Campus" />
          </div>
        </div>
        <div className="select-section">
          <select className="country-dropdown">
            <option value="">Select Country</option>
            <option value="USA">USA</option>
            <option value="CANADA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="IRLAND">Ireland</option>
            <option value="AUSTRILIA">Australia</option>
            <option value="NZ">New Zealand</option>
            <option value="EUROPE">Europe</option>
            <option value="ASIA">Asia</option>
          </select>
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
    </div>
    </div>

    {/* Our Strength */}
    <div className="our-strengths">
      <h2 className="section-title">Our Strengths</h2>
      <div className="strengths-grid">
        {strengthsData.map((strength, index) => (
          <div key={index} className="strength-card">
            <div className="logo-wrapper">
              <img src={strength.logo} alt={strength.title} />
            </div>
            <h3 className="card-title">{strength.title}</h3>
            <p className="card-description">{strength.description}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Usa Section */}
    <div className="usa-section" id="USA" >
        <div className="usa-full-section">
      <div className="usa-content">
        <h2>Explore our study destinations!</h2>
        <div className="usa-text">
          <h3>USA</h3>
          <p>
            The United States of America has been a global leader in the field of education
            and boasts of a lion’s share of top ranked universities according to all major
            international rankings. Few countries offer as many high ranked universities and
            noble laureate academia, as USA does.
          </p>
          <ul className="usa-facts">
            <li>USA hosts more than a million international students</li>
            <li>Over 25% of world’s top 100 universities are in the USA</li>
            <li>Post-study stay back visas (OPT) up to 3 years for STEM programs</li>
            <li>Internships (CPT) up to 12 months while studying</li>
            <li>Merit Based & Need Based Scholarships</li>
          </ul>
          <a href="#" className="know-more">Know More &gt;</a>
        </div>
      </div>
      <div className="usa-images">
        <div className="image-wrapper">
          <img src={UsaSectionimg1} alt="USA 1" />
          <img src={UsaSectionimg2} alt="USA 2" />
          <img src={UsaSectionimg3} alt="USA 3" />
          <img src={UsaSectionimg4} alt="USA 4" />
        </div>
      </div>
      </div>
    </div>


{/* Canada Section */}
<div className="canada-section"  id="CANADA">
            <div className="canada-full-section">
                {/* Content Section */}
                <div className="canada-content">
                    <h2>Canada</h2>
                    <p>
                        A country that offers a truly dynamic education system with some of the world's best universities,
                        a high standard of living & a promising future. Canada is undoubtedly amongst the most popular
                        and ideal study destinations in the world.
                    </p>
                    <ul className="canada-facts">
                        <li>Among the Safest Countries Globally</li>
                        <li>Hands-on learning</li>
                        <li>Paid Internships Available</li>
                        <li>Post Study Work Visa up to 3 Years</li>
                        <li>Excellent Immigration Opportunities</li>
                    </ul>
                    <a href="#" className="know-more">Know More &gt;</a>
                </div>

                {/* Image Section */}
                <div className="canada-images">
                    <div className="image-wrapper">
                        <img src={CanadaSectionimg1} alt="Canada Image 1" />
                        <img src={CanadaSectionimg2} alt="Canada Image 2" />
                        <img src={CanadaSectionimg3} alt="Canada Image 3" />
                        <img src={CanadaSectionimg4} alt="Canada Image 4" />
                    </div>
                </div>
            </div>
        </div>



{/* UK Section */}
<div className="UK-section" id="UK">
            <div className="UK-full-section">
                {/* Content Section */}
                <div className="UK-content">
                    <h2>United Kingdom</h2>
                    <p>
                    With an academic reputation built on centuries old heritage, The UK is home to some of the world’s oldest universities that consistently rank among the highest in the world. Universities in UK have a rich legacy of welcoming international students for centuries and are known to offer an unforgettable student experience as they know the needs and aspirations of their students very well.
                    </p>
                    <ul className="UK-facts">
                        <li>The UK undertakes 5% of the world’s scientific research and produces 14% of the world’s most frequently cited papers</li>
                        <li>UK welcomes over 400,000 students every year</li>
                        <li>Post study work visa of 2 years</li>
                        <li>12 of world’s top 100 universities are in The UK (QS World Rankings 2023)</li>
                        <li>14 of the best student cities in the world are in The UK (QS Best Student Cities 2023)</li>
                    </ul>
                    <a href="#" className="know-more">Know More &gt;</a>
                </div>

                {/* Image Section */}
                <div className="UK-images">
                    <div className="image-wrapper">
                        <img src={UKSectionimg1} alt="UK Image 1" />
                        <img src={UKSectionimg2} alt="UK Image 2" />
                        <img src={UKSectionimg3} alt="UK Image 3" />
                        <img src={UKSectionimg4} alt="UK Image 4" />
                    </div>
                </div>
            </div>
        </div>



{/* Irland Section */}
<div className="Irland-section" id="IRLAND">
            <div className="Irland-full-section">
                {/* Content Section */}
                <div className="Irland-content">
                    <h2>Ireland</h2>
                    <p>
                    Set yourself on a path of a global career with one of the world’s most dynamic & advanced education systems. Foster your creativity & entrepreneurship in universities that are developing world class graduates to address challenges of today and the future.
                    </p>
                    <ul className="Irland-facts">
                        <li>Europe’s fastest growing economy</li>
                        <li>Ranked #10 Globally for High-Quality Scientific Research</li>
                        <li>Post Study Work Visa up to 2 Years</li>
                        <li>All Universities Globally Ranked among top 5%</li>
                        <li>Ranked as the 13th most peaceful place on Earth</li>
                    </ul>
                    <a href="#" className="know-more">Know More &gt;</a>
                </div>

                {/* Image Section */}
                <div className="Irland-images">
                    <div className="image-wrapper">
                        <img src={IrlandSectionimg1} alt="Irland Image 1" />
                        <img src={IrlandSectionimg2} alt="Irland Image 2" />
                        <img src={IrlandSectionimg3} alt="Irland Image 3" />
                        <img src={IrlandSectionimg4} alt="Irland Image 4" />
                    </div>
                </div>
            </div>
        </div>


{/* Austrilia Section */}
<div className="Austrilia-section" id="AUSTRILIA">
            <div className="Austrilia-full-section">
                {/* Content Section */}
                <div className="Austrilia-content">
                    <h2>Australia</h2>
                    <p>
                    A network of world leading universities, outstanding learning & research facilities, inspiring lectures from brilliant instructors & unparalleled academic excellence, Australian education system offers them all with an exceptional student experience & qualifications that are valued world over.
                    </p>
                    <ul className="Austrilia-facts">
                        <li>7 of World’s Top 100 Universities</li>
                        <li>Choose from over 22,000 Courses across 1,100 Institutions </li>
                        <li>7 of the Best Student Cities in the World (QS Best Student Cities 2023)</li>
                        <li>More than A$300 Million Invested in Scholarships for International Students </li>
                        <li>Australian Universities have Produced 15 Nobel Laureates</li>
                    </ul>
                    <a href="#" className="know-more">Know More &gt;</a>
                </div>

                {/* Image Section */}
                <div className="Austrilia-images">
                    <div className="image-wrapper">
                        <img src={AustriliaSectionimg1} alt="Austrilia Image 1" />
                        <img src={AustriliaSectionimg2} alt="Austrilia Image 2" />
                        <img src={AustriliaSectionimg3} alt="Austrilia Image 3" />
                        <img src={AustriliaSectionimg4} alt="Austrilia Image 4" />
                    </div>
                </div>
            </div>
        </div>


{/* NZ Section */}
<div className="NZ-section" id="NZ">
            <div className="NZ-full-section">
                {/* Content Section */}
                <div className="NZ-content">
                    <h2>New Zealand</h2>
                    <p>
                    New Zealand offers world class education system, qualifications that are valued globally, an unmatchable lifestyle and friendly & welcoming natives. This island country has abundant natural beauty, breathtaking landscapes and picturesque coastlines that make studying in New Zealand an adventurous experience.
                    </p>
                    <ul className="NZ-facts">
                        <li>New Zealand universities are ranked in the top 3% in the world</li>
                        <li>Only country in the world to have all its universities in the global top 500</li>
                        <li>Over 20,000 international students from 160 countries</li>
                        <li>8 state-funded universities, 16 Institutes of Technology and Polytechnics (ITPs) & 550 Private Training Establishments (PTEs)</li>
                        <li>Post-study work visa up to three years and good permanent residency prospects</li>
                    </ul>
                    <a href="#" className="know-more">Know More &gt;</a>
                </div>

                {/* Image Section */}
                <div className="NZ-images">
                    <div className="image-wrapper">
                        <img src={NZSectionimg1} alt="NZ Image 1" />
                        <img src={NZSectionimg2} alt="NZ Image 2" />
                        <img src={NZSectionimg3} alt="NZ Image 3" />
                        <img src={NZSectionimg4} alt="NZ Image 4" />
                    </div>
                </div>
            </div>
        </div>



{/* Europe Section */}
<div className="Europe-section" id="EUROPE">
            <div className="Europe-full-section">
                {/* Content Section */}
                <div className="Europe-content">
                    <h2>Europe</h2>
                    <p>
                    Home to thousands of universities and institutions, Europe has some of the world’s strongest economies and offers excellent learning and research opportunities that make studying here a life changing & rewarding experience.
                    </p>
                    <ul className="Europe-facts">
                        <li>18 Universities among World’s Top 100</li>
                        <li>Low Tuition Fee</li>
                        <li>High Academic Standards & Cutting Edge Research</li>
                        <li>Schengen Visa – Passport to Europe</li>
                        <li>Post Study Work Opportunity up to 2 Years</li>
                    </ul>
                    <a href="#" className="know-more">Know More &gt;</a>
                </div>

                {/* Image Section */}
                <div className="Europe-images">
                    <div className="image-wrapper">
                        <img src={EuropeSectionimg1} alt="Europe Image 1" />
                        <img src={EuropeSectionimg2} alt="Europe Image 2" />
                        <img src={EuropeSectionimg3} alt="Europe Image 3" />
                        <img src={EuropeSectionimg4} alt="Europe Image 4" />
                    </div>
                </div>
            </div>
        </div>
        


{/* Asia Section */}
<div className="Asia-section" id="ASIA">
            <div className="Asia-full-section">
                {/* Content Section */}
                <div className="Asia-content">
                    <h2>Asia</h2>
                    <p>
                    Home to thousands of universities and institutions, Asia has some of the world’s strongest economies and offers excellent learning and research opportunities that make studying here a life changing & rewarding experience.
                    </p>
                    <ul className="Asia-facts">
                        <li>18 Universities among World’s Top 100</li>
                        <li>Low Tuition Fee</li>
                        <li>High Academic Standards & Cutting Edge Research</li>
                        <li>Schengen Visa – Passport to Asia</li>
                        <li>Post Study Work Opportunity up to 2 Years</li>
                    </ul>
                    <a href="#" className="know-more">Know More &gt;</a>
                </div>

                {/* Image Section */}
                <div className="Asia-images">
                    <div className="image-wrapper">
                        <img src={AsiaSectionimg1} alt="Asia Image 1" />
                        <img src={AsiaSectionimg2} alt="Asia Image 2" />
                        <img src={AsiaSectionimg3} alt="Asia Image 3" />
                        <img src={AsiaSectionimg4} alt="Asia Image 4" />
                    </div>
                </div>
            </div>
        </div>


   </>
  );
};

export default StudyZone;
