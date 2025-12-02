import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";
import "../styles/terms.css";
import "../styles/login.css";

const Terms = () => {
  const [content, setContent] = useState({ en: "", se: "" });
  const [lang, setLang] = useState("en");
  const termsTitle = { en: "Terms", se: "Villkor" };
  const [navContent, setNavContent] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch terms content
    axios
      .get(`${API_BASE_URL}/content/terms`)
      .then((res) => setContent(res.data))
      .catch((err) => console.error(err));

    // Fetch nav content
    axios
      .get(`${API_BASE_URL}/content/login`)
      .then((res) => setNavContent(res.data))
      .catch((err) => console.error(err));
  }, []);

  const t = (key) => navContent[key]?.[lang] || navContent[key]?.en || "";

  return (
    <div
      className="terms-page"
      style={{
        backgroundImage:
          "url('https://storage.123fakturera.se/public/wallpapers/sverige43.jpg')",
      }}
    >
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-logo">
          <img
            src="https://storage.123fakturera.se/public/icons/diamond.png"
            alt="Logo"
          />
        </div>
        <div className="nav-links">
          <a href="#">{t("nav_home") || "Home"}</a>
          <a href="#">{t("nav_order") || "Order"}</a>
          <a href="#">{t("nav_customers") || "Our Customers"}</a>
          <a href="#">{t("nav_about") || "About us"}</a>
          <a href="#">{t("nav_contact") || "Contact Us"}</a>
          <div
            className="lang-selector"
            onClick={() => setLang(lang === "en" ? "se" : "en")}
          >
            <span>{lang === "en" ? "English" : "Swedish"}</span>
            <img
              src={
                lang === "en"
                  ? "https://storage.123fakturere.no/public/flags/GB.png"
                  : "https://storage.123fakturere.no/public/flags/SE.png"
              }
              alt="Flag"
            />
          </div>
        </div>
      </nav>

      <div className="terms-container">
        <h1 className="terms-title">
          {lang === "en" ? termsTitle.en : termsTitle.se}
        </h1>

        <button className="close-btn" onClick={() => navigate(-1)}>
          Close and Go Back
        </button>

        <div className="terms-card">
          <div className="terms-text">
            {lang === "en" ? content.en : content.se}
          </div>
        </div>

        <button className="close-btn bottom-btn" onClick={() => navigate(-1)}>
          Close and Go Back
        </button>
      </div>
    </div>
  );
};

export default Terms;
