// import React from "react";

// export default function Loader() {
//   return (
//     <div>
//       <div className="cart-loader">
//         <div className="cart-body">
//           <div className="cart-handle"></div>
//           <div className="cart-wheel left"></div>
//           <div className="cart-wheel right"></div>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/components/Loader.jsx

import React from 'react';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader">
        <svg className="cart-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
          <g fill="none" stroke="#00c853" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="20" cy="52" r="3" fill="#00c853" />
            <circle cx="48" cy="52" r="3" fill="#00c853" />
            <path d="M4 8h8l8 32h28l8-20H16" />
          </g>
        </svg>
        
      </div>
    </div>
  );
};

export default Loader;
