import React from "react";
import { FaBook } from "react-icons/fa";
import { LuSparkles } from "react-icons/lu"; // Optional sparkle icon
import "../App.css";


function Header() {
  return (
  <div className="header-left">
  <span className="sparkle-icon">✨</span>
  Whimsy Planner
  <span className="book-icon">📖</span>
</div>

  );
}

export default Header;
