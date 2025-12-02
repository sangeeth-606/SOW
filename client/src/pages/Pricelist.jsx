import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";
import "../styles/pricelist.css";

const Pricelist = () => {
  const [products, setProducts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(API_BASE_URL + "/products", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  }, [navigate]);

  const handleChange = (id, field, value) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  };
  // Triggered when an input loses focus. Sends the full product to the API
  // so each field auto-saves as soon as the user clicks out of the input.

  const handleBlur = (product) => {
    const token = localStorage.getItem("token");
    axios
      .put(API_BASE_URL + "/products/" + product.id, product, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("Saved:", res.data);
      })
      .catch((err) => {
        console.error("Error saving data:", err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    { icon: "📄", label: "Invoices", color: "blue" },
    { icon: "👥", label: "Customers", color: "blue" },
    { icon: "⚙️", label: "My Business", color: "blue" },
    { icon: "📋", label: "Invoice Journal", color: "blue" },
    {
      icon: "🏷️",
      label: "Price List",
      color: "orange",
      active: true,
      dot: "green",
    },
    { icon: "📑", label: "Multiple Invoicing", color: "blue" },
    { icon: "⚠️", label: "Unpaid Invoices", color: "blue", dot: "red" },
    { icon: "🎁", label: "Offer", color: "orange", dot: "orange" },
    { icon: "📦", label: "Inventory Control", color: "gray", disabled: true },
    { icon: "👤", label: "Member Invoicing", color: "gray", disabled: true },
    { icon: "☁️", label: "Import/Export", color: "blue" },
    { icon: "🚪", label: "Log out", color: "blue", isLogout: true },
  ];

  return (
    <div className="pricelist-layout">
      {/* Header Area */}
      <header className="main-header">
        <div className="header-left">
          <button
            className="hamburger-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="user-profile">
            <div className="avatar">
              <img
                src="https://c4.wallpaperflare.com/wallpaper/493/575/809/stars-silver-surfer-black-background-hd-wallpaper-preview.jpg"
                alt="User"
              />
            </div>
            <div className="user-details">
              <span className="user-name">John Andre</span>
              <span className="company-name">Storfjord AS</span>
            </div>
          </div>
        </div>
        <div className="header-right">
          <span className="lang-text">Norsk Bokmål</span>
          <img
            src="https://storage.123fakturere.no/public/flags/NO.png"
            alt="Flag"
            className="flag-img"
          />
        </div>
      </header>

      <div className="main-container">
        {/* Sidebar Section */}
        <aside className={sidebarOpen ? "sidebar open" : "sidebar closed"}>
          <div className="sidebar-header">
            <h3>Menu</h3>
          </div>
          <nav className="sidebar-nav">
            <ul>
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={
                    "menu-item" +
                    (item.active ? " active" : "") +
                    (item.disabled ? " disabled" : "")
                  }
                  onClick={() => item.isLogout && handleLogout()}
                >
                  {item.dot && (
                    <span className={"status-dot " + item.dot}></span>
                  )}
                  <span className={"menu-icon " + item.color}>{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="content-area">
          {/* Toolbar */}
          <div className="toolbar">
            <div className="search-section">
              <div className="search-box">
                <input type="text" placeholder="Search Article No ..." />
                <span className="search-icon">🔍</span>
              </div>
              <div className="search-box">
                <input type="text" placeholder="Search Product ..." />
                <span className="search-icon">🔍</span>
              </div>
            </div>
            <div className="action-buttons">
              <button className="btn-action btn-add">
                <span className="btn-text">New Product</span>
                <span className="btn-icon green">+</span>
              </button>
              <button className="btn-action btn-print">
                <span className="btn-text">Print List</span>
                <span className="btn-icon blue">🖨️</span>
              </button>
              <button className="btn-action btn-toggle">
                <span className="btn-text">Advanced mode</span>
                <span className="toggle-switch"></span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="pricelist-table-container">
            <div className="table-wrapper">
              <table className="pricelist-table">
                <thead>
                  <tr>
                    <th className="col-arrow"></th>
                    <th className="col-article">
                      Article No. <span className="sort-arrow">↓</span>
                    </th>
                    <th className="col-product">
                      Product/Service <span className="sort-arrow">↓</span>
                    </th>
                    <th className="col-inprice">In Price</th>
                    <th className="col-price">Price</th>
                    <th className="col-unit">Unit</th>
                    <th className="col-stock">In Stock</th>
                    <th className="col-desc">Description</th>
                    <th className="col-actions"></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="product-row">
                      <td className="col-arrow">
                        <span className="arrow">→</span>
                      </td>
                      <td className="col-article">
                        <input
                          type="text"
                          value={product.article_no || ""}
                          onChange={(e) =>
                            handleChange(
                              product.id,
                              "article_no",
                              e.target.value,
                            )
                          }
                          onBlur={() => handleBlur(product)}
                        />
                      </td>
                      <td className="col-product">
                        <input
                          type="text"
                          value={product.name || ""}
                          onChange={(e) =>
                            handleChange(product.id, "name", e.target.value)
                          }
                          onBlur={() => handleBlur(product)}
                        />
                      </td>
                      <td className="col-inprice">
                        <input
                          type="number"
                          value={product.in_price || ""}
                          onChange={(e) =>
                            handleChange(product.id, "in_price", e.target.value)
                          }
                          onBlur={() => handleBlur(product)}
                        />
                      </td>
                      <td className="col-price">
                        <input
                          type="number"
                          value={product.price || ""}
                          onChange={(e) =>
                            handleChange(product.id, "price", e.target.value)
                          }
                          onBlur={() => handleBlur(product)}
                        />
                      </td>
                      <td className="col-unit">
                        <input
                          type="text"
                          value={product.unit || ""}
                          onChange={(e) =>
                            handleChange(product.id, "unit", e.target.value)
                          }
                          onBlur={() => handleBlur(product)}
                        />
                      </td>
                      <td className="col-stock">
                        <input
                          type="number"
                          value={product.in_stock || ""}
                          onChange={(e) =>
                            handleChange(product.id, "in_stock", e.target.value)
                          }
                          onBlur={() => handleBlur(product)}
                        />
                      </td>
                      <td className="col-desc">
                        <input
                          type="text"
                          value={product.description || ""}
                          onChange={(e) =>
                            handleChange(
                              product.id,
                              "description",
                              e.target.value,
                            )
                          }
                          onBlur={() => handleBlur(product)}
                        />
                      </td>
                      <td className="col-actions">
                        <button className="actions-btn">···</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Pricelist;
