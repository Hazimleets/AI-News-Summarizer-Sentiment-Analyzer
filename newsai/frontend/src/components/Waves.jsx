// frontend/src/components/Waves.jsx
import React from "react";
import "./Waves.css";

function Waves() {
  return (
    <div className="waves-container">
      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="wave-path"
            d="M-160 44c30 0 
              58-18 88-18s58 18 88 18 
              58-18 88-18 58 18 88 18 
              v44h-352z"
          />
        </defs>
        <g className="wave-parallax">
          <use href="#wave-path" x="50" y="0" fill="rgba(255,255,255,0.1)" />
          <use href="#wave-path" x="50" y="3" fill="rgba(255,255,255,0.15)" />
          <use href="#wave-path" x="50" y="5" fill="rgba(255,255,255,0.2)" />
          <use href="#wave-path" x="50" y="7" fill="rgba(255,255,255,0.25)" />
        </g>
      </svg>
    </div>
  );
}

export default Waves;

