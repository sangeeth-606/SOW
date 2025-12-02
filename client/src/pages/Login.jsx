import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";
import "../styles/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [content, setContent] = useState({});
  const [lang, setLang] = useState("se");
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/pricelist");
    }

    axios
      .get(`${API_BASE_URL}/content/login`)
      .then((res) => setContent(res.data))
      .catch((err) => console.error(err));
  }, [navigate]);

  const t = (key) => content[key]?.[lang] || content[key]?.en || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUsernameError("");
    setPasswordError("");

    let hasError = false;

    if (!username.trim()) {
      setUsernameError("Please enter a valid email address");
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError("This field cannot be empty");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/pricelist");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Login Failed");
      } else {
        setError("Server Error");
      }
    }
  };

  const selectLanguage = (selectedLang) => {
    setLang(selectedLang);
    setShowLangDropdown(false);
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url('https://storage.123fakturera.se/public/wallpapers/sverige43.jpg')`,
      }}
    >
      <nav className="top-nav">
        <div className="nav-logo">
          <img
            src="https://storage.123fakturera.se/public/icons/diamond.png"
            alt="Logo"
            className="navigation-logo"
          />
        </div>
        <div className="nav-links">
          <a href="#">{t("nav_home") || "Home"}</a>
          <a href="#">{t("nav_order") || "Order"}</a>
          <a href="#">{t("nav_customers") || "Our Customers"}</a>
          <a href="#">{t("nav_about") || "About us"}</a>
          <a href="#">{t("nav_contact") || "Contact Us"}</a>
          <div className="lang-dropdown-wrapper">
            <div
              className="lang-selector"
              onClick={() => setShowLangDropdown(!showLangDropdown)}
            >
              <span>{lang === "en" ? "English" : "Svenska"}</span>
              <img
                src={
                  lang === "en"
                    ? "https://storage.123fakturere.no/public/flags/GB.png"
                    : "https://storage.123fakturere.no/public/flags/SE.png"
                }
                alt="Flag"
              />
            </div>
            {showLangDropdown && (
              <div className="lang-dropdown">
                <div
                  className="lang-option"
                  onClick={() => selectLanguage("se")}
                >
                  <span>Svenska</span>
                  <img
                    src="https://storage.123fakturere.no/public/flags/SE.png"
                    alt="Swedish"
                  />
                </div>
                <div
                  className="lang-option"
                  onClick={() => selectLanguage("en")}
                >
                  <span>English</span>
                  <img
                    src="https://storage.123fakturere.no/public/flags/GB.png"
                    alt="English"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="login-card-wrapper">
        <div className="login-container">
          <h2 className="login-title">{t("login_title") || "Log in"}</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t("email_label") || "Enter your email address"}</label>
              <input
                type="text"
                className="form-control"
                placeholder={t("email_placeholder") || "Email address"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameError && <p className="field-error">{usernameError}</p>}
            </div>

            <div className="form-group">
              <label>{t("password_label") || "Enter your password"}</label>
              <div className="password-input-wrapper">
                <input
                  type="password"
                  className="form-control"
                  placeholder={t("password_placeholder") || "Password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {passwordError && <p className="field-error">{passwordError}</p>}
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="login-button-row">
              <button type="submit" className="btn-login">
                {t("login_button") || "Log in"}
              </button>
            </div>

            <div className="form-footer-links">
              <a href="#">{t("signup_link") || "Register"}</a>
              <a href="#">
                {t("forgot_password_link") || "Forgotten password?"}
              </a>
            </div>
          </form>
        </div>
      </div>

      <footer className="login-footer">
        <div className="footer-left">
          <h2>{t("footer_123invoice") || "123 Fakturera"}</h2>
        </div>
        <div className="footer-right">
          <a href="#">{t("nav_home") || "Home"}</a>
          <a href="#">{t("nav_order") || "Order"}</a>
          <a href="#">{t("nav_contact") || "Contact us"}</a>
        </div>
        <div className="footer-bottom">
          <p>
            {t("footer_copyright") ||
              "© Lättfaktura, CRO no. 638537, 2025. All rights reserved."}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
