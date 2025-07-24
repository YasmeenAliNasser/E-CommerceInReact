// src/Components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-sky-950  py-14 mt-10">
      <div className="container space-y-3">
        <h1 className=" text-3xl logo font-extrabold">Get the FreshCart App</h1>
        <p className=" text-sec text-xl">   
          We will send you a link, open it on your phone to download the app
        </p>
        
          <div className=" w-full    space-x-30">
            <input
              type="text"
              name="email"
              placeholder="Email...."
              className="rounded-lg px-3 py-2 mt-1 mb-5   border-2 border-gray-200 w-3/4  bg-white"
            />
       
       <button className=" bg-primary text-white py-2
        px-5 rounded-xl text-2xl">
        Share    App Link
       </button>

          </div>
       
      </div>
      <hr className="w-3/4 m-auto text-gray-300 mt-5 " />
      <div className="container mx-auto px-4 py-6 w-3/4 ">
        <div className="flex   flex-row justify-between space-x-3">
          <div className="flex gap-4 justify-center items-center">
            <h3 className="text-xl   logo dark:text-gray-100 mb-4">
              payment partners
            </h3>
            <img
              src="https://eco-iota-amber.vercel.app/assets/amazon-pay-C6yg0mFR.png"
              alt="Amazon Pay Logo"
              width="100"
            />

              <img
              src="https://eco-iota-amber.vercel.app/assets/American-Express-Color-BA04NtD8.png"
              alt="American Express"
              width="100"

            />


           
            <img
              src="https://eco-iota-amber.vercel.app/assets/mastercard-DpLisAk5.webp"
              alt="MasterCard"
                            width="100"

            />
             <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
              className="h-6"
            />
          
          </div>
          <div className="flex   gap-4 justify-center items-center">
          <h3 className="text-xl   logo dark:text-gray-100 mb-4">
            Get deliveries with FreshCart
            </h3>
            <img
              src="https://eco-iota-amber.vercel.app/assets/get-apple-store-9A-0RbJo.png"
              alt=" AppStore"
              className="h-10"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-8"
            />
          </div>
        </div>
      </div>
      <hr className="w-3/4 m-auto text-gray-300 " />

    </footer>
  );
}
