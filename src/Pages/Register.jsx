import { React, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, string, ref } from "yup";
import { FaUser } from "react-icons/fa";
export default function Register() {
  const passwordRegex = /^[A-Z][a-zA-Z0-9]{5,}$/;
  // const phoneRegex = /^01[0125][0-9]{8}$/;
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const validationSchema = object({
    name: string("name must be string")
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),
    email: string().required("Email is required").email("Email must be valid"),
    password: string()
      .required()
      .matches(
        passwordRegex,
        "Password must start with a capital letter followed by 5+ characters"
      ),
    rePassword: string()
      .required()
      .matches(passwordRegex)
      .oneOf([ref("password")], "Passwords do not match"),
    // phone: string()
    //   .required()
    //   .matches(phoneRegex, "Phone must be an Egyptian number"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: sendDataToSignUp,
    validationSchema,
  });
  console.log(formik.values.phone);


  async function sendDataToSignUp(values) {
    const loadingtoast = toast.loading("loading....");

    try {
      setError("");
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "post",
        data: values,
      };

      setTimeout(() => {
        navigate("/login");
      }, 200);

      const res = await axios.request(options);
      toast.success("registered successfully");

      console.log(res);
    } catch (err) {
      setError(err.response.data.message);
      toast.error(err.response.data.message);
      console.log(err);
    } finally {
      toast.dismiss(loadingtoast);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="p-10 xs:p-0 mx-auto w-full max-w-2xl">
        <div className="title flex items-center justify-center  text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-14 text-center"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <h1 className=" font-extrabold text-center text-4xl mb-5">
            Register Now
          </h1>
        </div>
        <div className="  w-full rounded-lg divide-y divide-gray-200">
          {error && <h2 className="text-red-500 text-xl my-3">{error}</h2>}
          <form onSubmit={formik.handleSubmit}>
            <div className="px-5 py-7 w-full ">
              {/* name */}
              <div>
                <input
                  placeholder="Enter Your Name"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="name"
                  className="rounded px-3 py-2 mt-1 mb-5   w-full   border-2 border-gray-300 placeholder-gray-400 placeholder:text-xl"
                />

                {formik.errors.name && formik.touched.name && (
                  <p className="text-xl text-red-500 my-4">
                    {formik.errors.name}
                  </p>
                )}
              </div>
              {/* email */}
              <div>
                <input
                  placeholder="Enter Your Email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                  className="rounded px-3 py-2 mt-1 mb-5  w-full    border-2 border-gray-300 placeholder-gray-400 placeholder:text-xl"
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-xl text-red-500 my-4">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              {/* phone */}
              <div>
                <input
                  placeholder="Enter Your Phone"
                  type="tel"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="phone"
                  className="rounded px-3 py-2 mt-1 mb-5  w-full    border-2 border-gray-300 placeholder-gray-400 placeholder:text-xl"
                />
                
                {formik.errors.phone && formik.touched.phone && (
                  <p className="text-xl text-red-500 my-4">
                    {formik.errors.phone}
                  </p>
                )}
              </div>
              {/* pass */}
              <div>
                <input
                  placeholder="Enter Your Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
                  className="rounded px-3 py-2 mt-1 mb-5  w-full    border-2 border-gray-300 placeholder-gray-400 placeholder:text-xl"
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="text-xl text-red-500 my-4">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              {/* repass */}
              <div>
                <input
                  placeholder="Enter Your Re-password"
                  type="password"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="rePassword"
                  className="rounded px-3 py-2 mt-1 mb-5  w-full    border-2 border-gray-300 placeholder-gray-400 placeholder:text-xl"
                />
                {formik.errors.rePassword && formik.touched.rePassword && (
                  <p className="text-xl text-red-500 my-4">
                    {formik.errors.rePassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="  bg-primary w-full text-white px-4 py-2  rounded"
              >
                <span className="inline-block mr-2 ">Sign Up</span>
              </button>
              <div className="flex items-center justify-center pt-4 text-lg hover:underline">
                <Link
                  to="/login"
                  className="text-primary text-center hover:underline"
                >
                  Already have an account?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
