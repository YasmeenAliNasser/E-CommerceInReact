import React from "react";

export default function Loader() {
  return (
    <div>
      <div className="cart-loader">
        <div className="cart-body">
          <div className="cart-handle"></div>
          <div className="cart-wheel left"></div>
          <div className="cart-wheel right"></div>
        </div>
      </div>
    </div>
  );
}
