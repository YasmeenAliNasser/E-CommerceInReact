 import axios from "axios";
import { useFormik } from "formik";
import React, {  useContext, useState } from "react";
import toast from "react-hot-toast";
import {  Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { AuthContext } from "../Context/AuthContext";

export default function Login() {
  let passRegex=/^[A-z][a-zA-z0-9]{5,}$/
   let naviagate=useNavigate() 
   let[error,setError]=useState("") 

  //  validation
  let validationSchema=object({
    email:string().required("Email is required").email("Email must be valid"),
    password:string().required().matches( passRegex, "Password must start with a capital letter followed by 5+ characters"  ),
  })

  // obj
  let formik=useFormik({
    initialValues:{
       email:"",
       password:""
    },
    onSubmit:sendDataToSignIn,
    validationSchema
  })

 let{setToken} =useContext(AuthContext)
  // send
   async function sendDataToSignIn(values) {
    const loadingtoast = toast.loading("loading....");
    
    try {
      setError('')

      let options={
        url:'https://ecommerce.routemisr.com/api/v1/auth/signin',
        method:'post',
        data:values
      }
      

      let res= await axios.request(options)
      console.log(res.data.token);
      localStorage.setItem('token',res.data.token)
       

      setToken(res.data.token)
      toast.success("Logined successfully");

      setTimeout(() => {
        naviagate('/')
      }, 2000);

      
    } catch (err) {
      setError(err.response.data.message);
      toast.error(err.response.data.message);
      console.log(err);
    } finally {
      toast.dismiss(loadingtoast);
    }


  }
  return (
    <div>
     <div className="  pt-27 flex items-center justify-center   ">
      <div className="  xs:p-0 mx-auto w-full max-w-2xl">
         
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
           Login
          </h1>
        </div>
          <div className="  w-full rounded-lg divide-y divide-gray-200">
          {error && <h2 className="text-red-500 text-xl my-3">{error}</h2>}

            <form onSubmit={formik.handleSubmit} >
            <div className="px-5 py-7">
            {/* email */}
              <div>
              
              <input
                type="text"
                name="email"
                placeholder="Enter Your Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                  className="rounded px-3 py-2 mt-1 mb-5   w-full   border-2 border-gray-300 placeholder-gray-400 placeholder:text-xl"
                 
              />
              {formik.errors.email && formik.touched.email &&<p className='text-xl text-red-500 my-4'>{formik.errors.email}</p>}
              </div>
              {/* pass */}
             <div>
             
              <input
                name="password"
                placeholder="Enter Your Password"
                type='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                  className="rounded px-3 py-2 mt-1 mb-5   w-full   border-2 border-gray-300 placeholder-gray-400 placeholder:text-xl"
                 
              />
              {formik.errors.password && formik.touched.password &&<p className='text-xl text-red-500 my-4'>{formik.errors.password}</p>}

             </div>

              <button
                type="submit"
                className="  bg-primary w-full text-white px-4 py-2  rounded"
              >
                <span className="inline-block mr-2 "> Login</span>
              </button>
              <div className="flex items-center justify-center pt-4 text-lg hover:underline">
                <Link
                  to="/forget"
                  className="text-primary text-center hover:underline"
                >
                  Forget Your Password?
                </Link>
              </div>
               <Link to={'/reg'}>
                <button
                type="submit"
                className="  bg-primary w-1/3 m-auto flex justify-center items-center text-white px-4 py-2  rounded"
              >
                <span className="inline-block mr-2 "> Create New Account</span>
              </button>
               </Link>
            </div>
            </form>
            
          </div>
           
        </div>
      </div>
    </div>
  );
}

// Yasmin63