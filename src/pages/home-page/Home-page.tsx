import React from "react";
import Navbar from "../../components/navbar/Navbar";
import HeroSection from "../../components/home/Home";
import RoomSlider from "../../components/roomSlider/RoomSlider";
import ServicesSection from "../../components/servicesSection/ServicesSection";
import NewsletterSection from "../../components/subscribeSection/SubscribeSection";
import Footer from "../../components/footer/Footer";
import '../../styles/Homepage.css'
 
const Homepage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <RoomSlider />
      <ServicesSection />
 
      <section className="experience-section">
        <p className="subtitle">MORE THAN JUST MOUNTAIN VIEW</p>
        <h2 className="title">Unforgettable Experience</h2>
 
        <div className="experience-grid">
          {[
            {
              id: 1,
              title: "Mountain Hiking",
              category: "OUTDOORS",
              image: "/images/sec1.jpeg",
              price: "$120 / PERSON",
              description:
                "With over 1,600 kilometers (994 miles) of trails, Banff National Park offers adventurers some of the best hiking on the planet.",
            },
            {
              id: 2,
              title: "Paddling Tour",
              category: "NATURE",
              image: "/images/sec2.jpeg",
              price: "$120 / PERSON",
              description:
                "Banff National Park’s biggest lake allows you to paddle for miles and enjoy breathtaking views.",
            },
            {
              id: 3,
              title: "Camping Tour",
              category: "OUTDOORS",
              image: "/images/sec3.jpeg",
              price: "$120 / PERSON",
              description:
                "Banff offers a range of camping spots allowing you to experience all of this most gorgeous park’s outdoor splendor.",
            },
          ].map((exp, index) => (
            <div key={exp.id} className={`experience-card ${index === 1 ? "highlight" : ""}`}>
              <div className="image" style={{ backgroundImage: `url(${exp.image})` }}>
                <span className="price">{exp.price}</span>
              </div>
              <div className="content">
                <p className="category">{exp.category}</p>
                <h3>{exp.title}</h3>
                <p className="description">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
 
      <NewsletterSection />
      <Footer />
    </div>
  );
};
 
export default Homepage;