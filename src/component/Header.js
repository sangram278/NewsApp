import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.pathname.split('/')[3] || 'general';
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 950);

  const handleCategoryChange = (newCategory) => {
    navigate(`/news/1/${newCategory}`);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 950;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <header className='header'>
        <h2>
        <a href="" onClick={() => navigate("/news/1/general")}>News </a> 
        </h2>

        {isMobile && (
          <button className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}

        <div className={`category-buttons ${isMobile ? (menuOpen ? "show" : "") : ""}`}>
          {["general", "technology", "business", "entertainment", "health", "science", "sports"].map(cat => (
            <span
              key={cat}
              className={`category-item ${category === cat ? "active-category" : ""}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </span>
          ))}
        </div>
      </header>
    </div>
  );
}

export default Header;