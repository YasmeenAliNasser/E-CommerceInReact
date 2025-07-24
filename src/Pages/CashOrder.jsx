 import React, { useContext } from "react";
import { CartContextVar } from "../Context/CartContext";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Car } from "lucide-react";

export default function CashOrder() {
  const { cart } = useContext(CartContextVar);

  if (!cart || cart.numOfCartItems === 0) {
    return <p className="text-center p-8">Your cart is empty.</p>;
  }

  return (
    <div className="container mx-auto p-6 pt-32 max-w-5xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Link
            to="/"
            className="text-white bg-primary p-2 rounded-full hover:bg-primtext-primary-700 transition"
          >
            <FaArrowLeft />
          </Link>
          Track your orders
          <Car color="green" />
        </h2>

        <Link to="/products">
          <button className="flex items-center gap-2 bg-primary hover:bg-primtext-primary-700 text-white font-bold px-4 py-2 rounded transition duration-300">
            <div className="w-2 h-2 bg-primtext-primary-500 rounded-full"></div>
            <span>Add New Products</span>
          </button>
        </Link>
      </div>



      {/* Products */}
      <div className="flex flex-col gap-8  border border-dashed border-gray-300">
            {/* Transaction Info */}
      <div className="   rounded-xl p-4 mb-8">
        <div className="flex justify-between text-sm text-gray-700 flex-wrap gap-2">
          <span><strong  className=" text-darkPrimary">Transaction Number:</strong><span className=" text-primary">#{cart.data._id}</span></span>
          <span><strong  className=" text-darkPrimary">Placed on:</strong> <span className=" text-primary">{new Date().toISOString().split("T")[0]}</span></span>
          <span><strong  className=" text-darkPrimary">Payment:</strong> <span className=" text-primary">Cash</span></span>
        </div>
      </div>
        {cart.data.products.map((item) => (
          <div key={item._id} className="  rounded-xl p-5 bg-white   relative flex flex-col md:flex-row gap-6">
            {/* Product Info */}
            <div className="flex gap-4 items-start flex-1">
              <img
                src={item.product?.imageCover}
                alt={item.product?.title}
                className="w-28 h-28 rounded-lg object-cover  "
              />
              <div className="flex flex-col justify-between">
                <h3 className="text-lg font-bold  text-darkPrimary mb-1">
                 <span className=" "> {item.product?.title?.slice(0, 20)}</span>
                </h3>
                <p className="text-sm   text-darkPrimary">
                  <strong>Price:</strong> <span className=" text-primary">EGP {item.price || 0}</span>
                </p>
                <p className="text-sm   text-darkPrimary">
                  <strong>Quantity:</strong> <span className=" text-primary">{item.count || 0}</span> 
                </p>
                <p className="text-sm   text-darkPrimary">
                  <strong>Category:</strong> <span className=" text-primary">{item.product?.category?.name || "No category"}</span> 
                </p>
                <p className="text-sm   text-darkPrimary">
                  <strong>Brand:</strong> <span className=" text-primary"> {item.product?.brand?.name || "No brand"}</span>
                </p>

                {/* Summary */}
                <div className="mt-4 text-sm text-darkPrimary space-y-1 border-t pt-4">
                  <p><strong>Product Quantity:</strong> <span className=" text-primary">{item.count}</span></p>
                  <p><strong>Shipping Price:</strong> <span className=" text-primary">EGP 0 </span></p>
                  <p><strong>Taxes:</strong> <span className=" text-primary">EGP 0</span></p>
                  <p className="text-darkPrimary font-bold text-lg">
                    Total for this item: EGP <span className=" text-primary">{item.count * item.price}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="w-full md:w-1/3 flex justify-center md:justify-end items-start">
              <div className="relative pr-6">
                {[
                  { label: "Ordered", done: true },
                  { label: "Confirmed", done: true },
                  { label: "Out for delivery", done: true },
                  { label: "Delivered", done: true },
                  { label: "Paid", done: false },
                ].map((step, index, arr) => (
                  <div key={index} className="flex items-center gap-2 relative mb-4">
                    {/* Vertical line */}
                    {index < arr.length - 1 && (
                      <span className="absolute left-1.5 top-3 h-6 border-l-2 border-gray-300"></span>
                    )}
                    {/* Dot */}
                    <span
                      className={`w-3 h-3 rounded-full z-10 border-2 ${
                        step.label === "Paid" && !step.done
                          ? "bg-red-500 border-red-500"
                          : step.done
                          ? "bg-primary text-primary border ext-primary"
                          : "bg-white border-gray-300"
                      }`}
                    ></span>
                    
                    {/* Label */}
                    <span
                      className={`text-sm ${
                        step.label === "Paid" && !step.done
                          ? "text-red-500"
                          : step.done
                          ? "text-primary"
                          : "text-gray-500"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
