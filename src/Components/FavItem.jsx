import React, { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FavContext } from "../Context/FavContext";

export default function FavItem({ item }) {
  const { deleteProduct } = useContext(FavContext);
  
  const [showConfirm, setShowConfirm] = useState(false);  

   

  

  function handleDelete() {
    deleteProduct(item.product._id);
    setShowConfirm(false);
  }

  return (
    <div>
      <div className="  h-full  mb-6 rounded-lg   gap-6    flex  justify-center items-center  ">
        <img
          src={item?.product.imageCover}
          alt="product-image"
          className="w-full rounded-2xl  border-2 border-gray-200 sm:w-40"
        />

        {/* info */}

        <div className="sm:ml-4 sm:flex sm:w-full  ">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-xl font-bold  text-darkPrimary">
              {item.product.title}
            </h2>

            <p className="mt-1 text-lg  text-primary flex  gap-2 ">
              <span className=" text-darkPrimary">Rate:</span>
              <span className=" text-yellow-400">
                <FaStar /> 
              </span>
              {item?.product?.ratingsAverage}
            </p>
            <p className="mt-1 text-lg  text-primary flex gap-2">
              <span className=" text-darkPrimary"> Price: </span> EGP
              {item?.price * item?.count}
            </p>
            <p className="mt-1 text-lg text-gray-500">
              {item?.product?.category?.name || "No Category"} |{" "}
              {item?.product?.brand?.name}|{" "}
              <span className="   text-primary">Available</span>
            </p>
          </div>
        </div>

        {/* quantity */}
      
        {/* price */}

        <div>
          <p className=" text-md-center text-darkPrimary flex flex-col">
            Total Price
            <span className=" text-primary">
             
              EGP{item?.price * item?.count}
            </span>
          </p>
        </div>

        {/* delete */}
        <div className="flex items-center space-x-4">
        <button
  onClick={() => setShowConfirm(true)}
  className="group  font-extrabold    text-gray-400 hover:text-red-800 p-2 rounded-full border-4 border-transparent hover:border-red-800 transition duration-300"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className=" size-5 transition-transform duration-500 group-hover:rotate-[180deg]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
</button>

        </div>
      </div>
      <hr  className=" w-3/4 p-7 m-auto text-gray-300 size-7 h-7"/>

     
      {showConfirm && (
        <div className="fixed inset-0  p-72 bg-black/40  w-full flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] text-center">
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className=" size-30  text-blue-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>

              <h2 className=" text-2xl font-bold mb-4 text-gray-600">
                Are you sure?
              </h2>
            </div>

            <p className="text-lg mt-7 mb-7">
              Do you want to delete this product ?
            </p>
            <div className="flex justify-around mt-4">
              <button
                className="bg-blue-400 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={handleDelete}
              >
                Yes,delete it
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-white py-2 px-4 rounded"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
