import React, { useContext } from "react";
import { CartContextVar } from "../Context/CartContext";
import CartItem from "../Components/CartItem";
import Check from "../Components/Check";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Cart() {
  let { cart, clearCart } = useContext(CartContextVar);

   
  return (
    <div className=" pt-30 flex justify-center   ">
      <div className="cart  bg-gray-100  w-3/4 m-auto rounded-2xl">
        <div>
          <div className="title flex justify-between pt-10 pl-7 pr-7">
            <div className="  flex   items-center gap-3  ">
              <Link
                to="/ "
                className="text-white text-2xl circle flex justify-center items-center hover:left-6"
              >
                <FaArrowLeft />
              </Link>
              <h2 className=" text-2xl font-extrabold text-green-700">
                Shop Cart
              </h2>
              <i className="fa-brands fa-opencart fa-lg text-primary"></i>
            </div>
            <div className="flex flex-col ">
              <h2 className=" text-xl text-green-700  font-bold mb-6">
                Total Price :
                <span className=" text-green-400">
                  EGP{cart.data.totalCartPrice}
                </span>
              </h2>
              <button className=" text-green-700 border border-green px-4  py-2 rounded-xl hover:bg-green-300 hover:text-white  bg-white text-xl">
                Check Out
              </button>
            </div> 
          </div>
        </div>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex flex-col md:space-x-6 xl:px-0">
          <div className="rounded-lg  w-full">
            {cart?.data?.products?.map((item) => (
              <CartItem item={item} key={item._id} />
            ))}
          </div>
          <div
              onClick={clearCart}
              className="mt-2 ml-auto w-fit px-4 py-2 flex items-center gap-2 bg-red-700 hover:bg-red-500 text-white rounded-xl cursor-pointer transition"
            >
              <FaTrash />
              <span>Clear All Products</span>
            </div>

          <div className="mt-6 h-full    p-6   md:mt-0 w-2/3 m-auto">
            

            <div className="  flex flex-col items-center justify-center  mb-6">
              <div className="  w-1/2  h-1 bg-primary mt-3 " />
              <h3 className=" text-xl font-extrabold p-3 text-darkPrimary ">
                Check Out
              </h3>
              <div className=" w-1/2 h-1  bg-primary mt-3 " />
            </div>
            <Check totalPrice={cart.data.totalCartPrice} />
          </div>
        </div>
      </div>
    </div>
  );
}
