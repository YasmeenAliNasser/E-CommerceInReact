import React, { useContext, useState } from "react";
import facebookIcon from "../assets/icons8-facebook.svg";
import instagramIcon from "../assets/icons8-instagram-logo.svg";
import linkedinIcon from "../assets/icons8-linkedin .svg";
import xIcon from "../assets/icons8-x.svg";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { Menu } from "lucide-react";
import { CartContextVar } from "../Context/CartContext";

export default function Navbar() {
  let { cart } = useContext(CartContextVar);
   
  let [isMobOpen, setIsMobOpen] = useState(false);
  const toggleMobMenu = () => setIsMobOpen(!isMobOpen);

  let { token, setToken } = useContext(AuthContext);
  let Logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsMobOpen(false);
  };

  const handleCloseMenu = () => setIsMobOpen(false);

  return (
    <>
      <div className="bg-gray-100 flex justify-center items-center p-7 text-xl fixed  left-0 right-0 z-20">
        <div className="container flex justify-between  w-4/5">
          {/* Logo and Desktop Nav */}
          <div className="flex space-x-4 items-center">
          <i className="fa-brands fa-opencart fa-lg text-primary"></i>
            <h1 className="text-3xl font-extrabold logo">Fresh Cart</h1>
            <ul className="hidden lg:flex space-x-4">
              <li className="link-hover">
                <Link to={"/"}>Home</Link>
              </li>
              <li className="link-hover">
                <Link to={"/products"}>Products</Link>{" "}
              </li>
              <li className="link-hover">
                <Link to={"/categories"}>Categories</Link>
              </li>
              <li className="link-hover">
                <Link to={"/brands"}>Brands</Link>
              </li>
               <li className="link-hover">
                <Link to={"/cash"}>Orders</Link>
              </li>
            </ul>
          </div>

          {/* Icons and Buttons */}
          <div className="flex items-center space-x-5">
            {token && (
              <div className="hidden lg:flex items-center space-x-5">
               <Link to={"/fav"}> 
                 <FaHeart size={30} color="green" />
               </Link>
                <div className="relative">
                  <Link to={"/cart"}>
                    <FaShoppingCart size={24} color="green" />
                  </Link>
                  <div className=" absolute -top-6 -left-6 text-sm bg-green-500 size-7 text-center rounded-full p-1">
                    {cart?.numOfCartItems}
                  </div>
                </div>
              </div>
            )}

            {/* Social Icons */}
            <div className="hidden lg:flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebookIcon} alt="Facebook" width={30} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagramIcon} alt="Instagram" width={30} />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <img src={xIcon} alt="X" width={30} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={linkedinIcon} alt="LinkedIn" width={30} />
              </a>
            </div>

            {/* Auth Buttons */}
            {!token ? (
              <ul className="hidden lg:flex space-x-4">
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
                <li>
                  <Link to={"/reg"}>Register</Link>
                </li>
              </ul>
            ) : (
              <button
                className="hidden lg:block cursor-pointer"
                onClick={Logout}
              >
                LogOut
              </button>
            )}

            {/* Mobile Menu Icon */}
            <div className="lg:hidden cursor-pointer" onClick={toggleMobMenu}>
              <Menu />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu تحت النافبار مباشرة */}
      {isMobOpen && (
        <div className="lg:hidden bg-gray-100 py-4 px-6 text-center shadow-md space-y-4">
          <Link to={"/"} onClick={handleCloseMenu} className="block">
            Home
          </Link>
          <Link to={"/products"} onClick={handleCloseMenu} className="block">
            Products
          </Link>
          <Link to={"/categories"} onClick={handleCloseMenu} className="block">
            Categories
          </Link>
          <Link to={"/brands"} onClick={handleCloseMenu} className="block">
            Brands
          </Link>
           <Link to={"/cash"} onClick={handleCloseMenu} className="block">
            Orders
          </Link>
          <span className="block"></span>

          {token && (
            <div className="flex justify-center gap-4">
              <FaHeart size={24} color="green" />

              <Link to={"/cart"}>
                <FaShoppingCart size={24} color="green" />
              </Link>
              <div className=" absolute -top-6 -left-6 text-sm bg-green-500 size-7 text-center rounded-full p-1">
                {cart?.numOfCartItems}
              </div>

              <div className=" flex gap-4 justify-center">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={facebookIcon} alt="Facebook" width={30} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={instagramIcon} alt="Instagram" width={30} />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={xIcon} alt="X" width={30} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={linkedinIcon} alt="LinkedIn" width={30} />
                </a>
              </div>
            </div>
          )}

          {!token ? (
            <>
              <Link to={"/login"} onClick={handleCloseMenu} className="block">
                Login
              </Link>
              <Link to={"/reg"} onClick={handleCloseMenu} className="block">
                Register
              </Link>
            </>
          ) : (
            <span onClick={Logout} className="block cursor-pointer">
              Logout
            </span>
          )}
        </div>
      )}
    </>
  );
}
