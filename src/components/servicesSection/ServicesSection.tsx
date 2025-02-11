import React from "react";
import "../../styles/ServicesSection.css"; 

const services = [
  { icon: "🚖", title: "Airport Pick-up Service", description: "Lorem ipsum proin gravida velit auctor alueut aenean sollicitu din, lorem auci elit consequat ipsutissem niuis sed odio sit amet a sit amet." },
  { icon: "🛏️", title: "Housekeeper Services", description: "Lorem ipsum proin gravida velit auctor alueut aenean sollicitu din, lorem auci elit consequat ipsutissem niuis sed odio sit amet a sit amet." },
  { icon: "📶", title: "Wifi & Internet", description: "Lorem ipsum proin gravida velit auctor alueut aenean sollicitu din, lorem auci elit consequat ipsutissem niuis sed odio sit amet a sit amet." },
  { icon: "🧺", title: "Laundry Services", description: "Lorem ipsum proin gravida velit auctor alueut aenean sollicitu din, lorem auci elit consequat ipsutissem niuis sed odio sit amet a sit amet." },
  { icon: "🍽️", title: "Breakfast in Bed", description: "Lorem ipsum proin gravida velit auctor alueut aenean sollicitu din, lorem auci elit consequat ipsutissem niuis sed odio sit amet a sit amet." },
  { icon: "🚗", title: "Private Parking Space", description: "Lorem ipsum proin gravida velit auctor alueut aenean sollicitu din, lorem auci elit consequat ipsutissem niuis sed odio sit amet a sit amet." }
];

const ServicesSection: React.FC = () => {
  return (
    <section className="services-section">
      <div className="services-container">
        {services.map((service) => (
          <div key={service.title} className="service-card">
            <span className="service-icon">{service.icon}</span>
            <div className="service-text">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
