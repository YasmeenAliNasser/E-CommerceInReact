 import { useFormik } from "formik";
import React from "react";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";

export default function Check({ totalPrice }) {
  const navigate = useNavigate();
  const productId = localStorage.getItem("productId");


  const token = localStorage.getItem('token'); 

  const phoneRegex = /^01[0125][0-9]{8}$/;

  const validationSchema = object({
    details: string()
      .required("Details is required")
      .min(10, "At least 10 characters"),
    phone: string()
      .required("Phone is required")
      .matches(phoneRegex, "Phone must be a valid Egyptian number"),
    city: string()
      .required("City is required")
      .min(2, "At least 2 characters"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: () => {
      alert("Online order (coming soon)");
    },
  });

  //  Handle Cash Order
  const handleCashOrder = async () => {
    await formik.validateForm();

    if (!formik.isValid) {
      formik.handleSubmit(); // Show validation errors
      return;
    }

    if (!token) {
      alert(" Please login to submit your order.");
      return;
    }

    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/${productId}`,
        {
          method: "POST",
          headers: {
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            shippingAddress: {
              details: formik.values.details,
              phone: formik.values.phone,
              city: formik.values.city,
            },
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert(" Order submitted successfully!");
        navigate("/cash");
      } else { 
        alert(data.message || " Failed to submit order.");
        console.error("Error:", data);
      }
    } catch (err) {
      console.error("Network error:", err);
      alert(" Network error.");
    }
  };

  return (
    <div className="container mx-auto border-2 border-gray-300 p-8 w-full max-w-2xl rounded-2xl">
      <h1 className="text-2xl font-bold text-darkPrimary mb-4">Cart Totals</h1>

      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-xl font-bold text-darkPrimary">Sub Total:</h3>
        <span className="text-green-600 font-semibold text-lg">
          EGP {totalPrice}
        </span>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* City */}
        <div>
          <input
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="Enter Your City Name"
            className="rounded px-3 py-2 mt-1 mb-5 w-full  bg-white"
          />
          {formik.errors.city && formik.touched.city && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.city}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="Enter Your Phone"
            className="rounded px-3 py-2 mt-1 mb-5 w-full  bg-white"
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
          )}
        </div>

        {/* Details */}
        <div>
          <textarea
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Details"
            className="rounded px-3 py-2 mt-1 mb-5 w-full bg-white"
          />
          {formik.errors.details && formik.touched.details && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.details}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          {/* Cash Order */}
          <button
            type="button"
            onClick={handleCashOrder}
            className="flex bg-primary hover:bg-green-400 text-white font-medium rounded-md justify-center items-center w-full"
          >
            <img
              src="https://eco-iota-amber.vercel.app/assets/cash1-DfoK3QaK.png"
              alt=""
              className="size-15"
            />
            <span>Cash Order</span>
          </button>

          {/* Online Order */}
          <button
            type="submit"
            className="flex bg-white hover:bg-primary text-green-800 hover:text-white font-medium rounded-md justify-center items-center w-full"
          >
            <img
              src="https://eco-iota-amber.vercel.app/assets/online1-CDuK_NPr.png"
              alt=""
              className="size-15"
            />
            <span>Online Order</span>
          </button>
        </div>
      </form>
    </div>
  );
}
