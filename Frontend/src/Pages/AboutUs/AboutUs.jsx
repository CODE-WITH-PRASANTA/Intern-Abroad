import React, { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "./AboutUs.css";

// Assets for the About Section
import team from "../../assets/company-about-img-1.png";

// Asserts Of the Icons
import SearchIcons from '../../assets/Search-Icon.png'
import ClockIcon from '../../assets/Clock-Icon.png'
import PenIcon from '../../assets/Pen-icon.png'
import ComputerLogo from '../../assets/Computer-Icon.png'
import PayLogo from '../../assets/Pay-Icon.png'
import AssitantLogo from '../../assets/Assitant-icon.png'

// Asserts for the Our Team Section
import OurTeam from '../../assets/Team-Of-intern-abroad.png'

// Asserts for the organizations  Include
import aluminiorganisation from '../../assets/Host Organizations of The Intern Group.gif'

// Asserts for the Our Team Section
import TeamPhoto from '../../assets/Internship-group-teeam.jpeg'


// Asserts of the Team Member
import PrasantaProfile from '../../assets/PRASHANT KUMAR-MEMBER.avif'
import AnishcharanProfile from '../../assets/ANISHA CHANDRAN-MEMBER.webp'
import KamuridinProfile from '../../assets/KAMURIDIN SAIGAL-MEMBER.jpg'
import WorkingMember from "../../Component/WorkingMember/WorkingMember";


const AboutUs = () => {
   const navigate = useNavigate();
  
    const handelstartjourney = () => {
      navigate('/signup');
    };
    
  const headingRef = useRef(null);
  const countersRef = useRef([]);

  
  const steps = [
    {
      title: 'Step 1: Apply',
      content:
        'Submit your application and start working with your Admissions Counselor. We will have an interview to learn about your career goals, educational background, and location preferences to ensure that you are a good candidate to intern abroad.',
    },
    {
      title: 'Step 2: Accept',
      content:
        'Once your interview and application are complete, you’ll be cleared to apply. Our team will determine if we’re able to match you with a great host employer in your chosen destination. If accepted, this means we can guarantee you an internship within your career field.',
    },
    {
      title: 'Step 3: Enroll',
      content:
        'After acceptance, the next step is to enroll into the program with your deposit to secure your spot. Pay Program fee @ 2990USD via https://www.paypal.me/samsimransirraichand.',
    },
    {
      title: 'Step 4: Prepare',
      content:
        'Before arriving in your host city, you will work one-on-one with your Program Advisor to ensure you are ready to intern in your new home.',
    },
    {
      title: 'Step 5: Interview',
      content:
        'We will start the match-making process and narrow down employers. You’ll have a Skype or phone interview before your internship is confirmed.',
    },
    {
      title: 'Step 6: Arrive',
      content:
        'When you’ve arrived in your city, you’ll meet the Location Coordinator and other interns at your housing. Social events and resources will be provided to support your success.',
    },
  ];

  const startCounting = () => {
    countersRef.current.forEach((counter) => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;

        if (count < target) {
          counter.innerText = count + 1;
          setTimeout(updateCount, 10); // Adjust the delay for smoothness
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounting(); // Start counting when the section is visible
          }
        });
      },
      { threshold: 0.5 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="aboutus-heading-section">
        <div className="aboutus-content">
          <div className="badge">YOUR INTERN ABROAD SOLUTION</div>
          <h1 className="about-heading">Find Your Perfect Program</h1>
          <p className="description">
            We'll help you find and get into the perfect program in your dream
            destination.
          </p>
          <button className="start-btn" onClick={handelstartjourney}>Start your journey</button>
        </div>
      </div>

      <section className="about-agency">
        <div className="container">
          <div className="about-content">
            <div className="images-section">
              <div className="image-top">
                <img src={team} alt="Team Collaboration" className="image-main" />
              </div>
            </div>
            <div className="text-section">
              <h1 ref={headingRef} className="about-us-heading-2">
                About Us
              </h1>
              <h2 className="section-heading">
              India's Leading Company Internfly Abroad 
              </h2>
              <p className="description">
              At InternsflyAbroad, we use our knowledge of travel, cultures, and places to cultivate global citizens who reflect the world’s rich diversity. This is our form of social justice. This is our platform for change.Can you imagine completing college semester credits or earning extra cash just for temporarily living and working in an amazing country overseas? Interning abroad gives you just that opportunity!


              </p>
              <div className="stats">
                <div className="stat-item">
                  <h3 ref={(el) => (countersRef.current[0] = el)} data-target="100">
                    0
                  </h3>
                  <p>Happy Clients</p>
                </div>
                <div className="stat-item">
                  <div className="counter-container">
                    <h3 ref={(el) => (countersRef.current[1] = el)} data-target="15">
                      0
                    </h3>
                    <span className="plus-sign">+</span>
                  </div>
                  <p>Team Members</p>
                </div>
                <div className="stat-item">
                  <h3 ref={(el) => (countersRef.current[2] = el)} data-target="250">
                    0
                  </h3>
                  <p>Projects Done</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* WorkFlow Section */}

<div className="workflow-container">
  <h1 className="workflow-title">Interns Flyabroad</h1>
  <h2 className="workflow-subtitle">Our Workflow Process</h2>
  <p className="workflow-description">Overview of the Application & Placement Process</p>

  <div className="workflow-steps">
    <div className="workflow-step" data-aos="fade-up">
      <img src={SearchIcons} alt="Search Icon" className="workflow-icon" />
      <div className="workflow-content">
        <h3>Initial Research</h3>
        <p>Apply Online For Free and get connected with InternsflyAbroad @ +91 8253194975</p>
      </div>
    </div>

    <div className="workflow-step" data-aos="fade-up" data-aos-delay="100">
      <img src={ClockIcon} alt="Clock Icon" className="workflow-icon" />
      <div className="workflow-content">
        <h3>Get Accepted</h3>
        <p>
          Get accepted into your internship. Once you have submitted your online application, one of our
          Internship Managers will check that your background, experience, and interests are a good fit for
          your chosen internship program.
        </p>
      </div>
    </div>

    <div className="workflow-step" data-aos="fade-up" data-aos-delay="200">
      <img src={PenIcon} alt="Pen Icon" className="workflow-icon" />
      <div className="workflow-content">
        <h3>Pay Your Deposit</h3>
        <p>
          Pay ₹210 / 11700 INR at internsflyabroad.govt@boi. For international applicants, payment options for
          PayPal and PayNow are also available.
        </p>
      </div>
    </div>

    <div className="workflow-step" data-aos="fade-up" data-aos-delay="300">
      <img src={ComputerLogo} alt="Computer Icon" className="workflow-icon" />
      <div className="workflow-content">
        <h3>We Arrange Your Internship Placement</h3>
        <p>
          Our team of Internship Coordinators represents the dynamic international network to identify the best
          internship placement for you.
        </p>
      </div>
    </div>

    <div className="workflow-step" data-aos="fade-up" data-aos-delay="400">
      <img src={PayLogo} alt="Pay Icon" className="workflow-icon" />
      <div className="workflow-content">
        <h3>Pay the Balance of Your Program Fee</h3>
        <p>
          Lock in your internship plans by paying the balance of your Program Fee. If you’re interning abroad,
          this will need to be paid no later than 60 days before your start date.
        </p>
      </div>
    </div>

    <div className="workflow-step" data-aos="fade-up" data-aos-delay="500">
      <img src={AssitantLogo} alt="Assistant Icon" className="workflow-icon" />
      <div className="workflow-content">
        <h3>Get Introduced to Your Supervisor</h3>
        <p>
          You will be introduced to your Supervisor for the internship once you have received your internship
          placement.
        </p>
      </div>
    </div>
  </div>
</div>
 {/* Alumini section */}
 <section className="alumni-organizations-section">
      <div className="content-wrapper">
        <div className="text-container">
          <h2>
            <span className="highlight">Our alumni</span> have interned at <strong>3,000+ organizations</strong> including:
          </h2>
        </div>
        <div className="image-container-alumin">
          <img src={aluminiorganisation} alt="Host Organizations of The Intern Group" />
        </div>
      </div>
    </section>

{/* Step Container */}
<div className="steps-wrapper">
      <header className="steps-header">
        <h1>Our Services</h1>
        <p>
          Let&apos;s Talk About Process
          <br />
          When you are applying for internships abroad, you will follow a step-by-step process with our team that will provide you with enough information to help you make an informed decision about an internship abroad with Global Experiences.
        </p>
      </header>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-box">
            <h2>{step.title}</h2>
            <p>{step.content}</p>
          </div>
        ))}
      </div>
    </div>


    {/* Who is Our Team Section? */}
    <section className="who-we-are-section">
      <div className="content-container">
        <h2>
          <span className="highlight">Who</span> we are ?
        </h2>
        <p>
        While we do offer the best quality products and services, what really makes Internsflyabroad.govt.in great is our incredible team. Passionate, experienced, talented and friendly, we truly have the best of the best. Get to know the people behind the business, who are dedicated to making sure your needs are not only met, but exceeded.
        </p>
        <p>
        Through our highly customized international internship and study abroad programs, we are able to encourage and inspire other young people to pack their bags, hop on a plane, and do as we’ve done. It’s our way of paying it forward. In today’s increasingly globalized economy, international experience is everything.
        </p>
        <p>
          Our programs provide the opportunity for participants to have the overseas adventure they want while simultaneously getting the professional experience they need. It’s the best of both worlds!
        </p>
      </div>
      <div className="image-container">
        <img src={OurTeam} alt="Our Team" />
      </div>
    </section>

   {/* Team Section */}
<section className="team-section-2">
  <div className="team-content">
    <h2 className="fade-in">International Paid Internships & Training Programs</h2>
    <p className="slide-up">
      International Paid internship. Internships & Training. Work Abroad. Project Training. Teach abroad.
      Gap year abroad. Language Schools. Aerospace Internship Training abroad. Aviation internship Abroad.
      High School internship abroad. Business Management internship Abroad.
    </p>
    <div className="working-hours">
      <p><strong>Working Hours:</strong></p>
      <ul>
        <li>Mon - Fri: 9am - 6pm</li>
        <li>Sat: 10am - 2pm</li>
        <li>Sun: Closed</li>
      </ul>
    </div>
    <div className="social-links">
      <a href="#" className="linkedin-btn fade-in">LinkedIn</a>
      <a href="#" className="whatsapp-btn fade-in">WhatsApp</a>
    </div>
  </div>
  <div className="team-image">
    <img src={TeamPhoto} alt="Our Team Abroad" className="image-zoom" />
  </div>
</section>



{/* Help Center */}
  <section className="help-center">
      <div className="help-center-content">
        <h1>HELP CENTER</h1>
        <h2>You Asked, We Answered</h2>
        <p>
          It's important to us that our customers feel fully informed and
          confident when working with us. That's why we've made an extensive
          list of past customers' questions along with answers from our
          experienced team. Browse through the information below, and if you
          have a question that isn't included here, feel free to reach out to
          us today.
        </p>
        <div className="help-center-contact">
          <a href="mailto:internsflyabroadgovt@gmail.com" className="email">
            internsflyabroadgovt@gmail.com
          </a>
          <a href="tel:+918235913975" className="phone">
            +91 8235913975
          </a>
        </div>
      </div>
    </section>
        
    <WorkingMember />

    </>
  );
};

export default AboutUs;
