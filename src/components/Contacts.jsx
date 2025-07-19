import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2 className="contact-title">Get in Touch</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea rows="4" placeholder="Your Message" required />
          <button type="submit" disabled>Send Message</button>
          <p className="note">(Form functionality coming soon)</p>
        </form>

        <div className="social-links">
          <a href="#" title="Instagram">📷</a>
          <a href="#" title="Facebook">📘</a>
          <a href="#" title="Pinterest">📌</a>
          <a href="#" title="X (Twitter)">❌</a>
          <a href="#" title="LinkedIn">💼</a>
          <a href="#" title="WhatsApp">💬</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
