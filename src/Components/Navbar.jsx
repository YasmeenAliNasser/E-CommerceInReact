 import React, { useContext, useState } from "react";
import facebookIcon from "../assets/icons8-facebook.svg";
import instagramIcon from "../assets/icons8-instagram-logo.svg";
import linkedinIcon from "../assets/icons8-linkedin .svg";
import xIcon from "../assets/icons8-x.svg";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
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
      <div className="bg-gray-100 flex justify-center items-center p-7 text-xl fixed left-0 right-0 z-20">
        <div className="container flex justify-between w-4/5">
          {/* Logo and Desktop Nav */}
          <div className="flex space-x-4 items-center">
            <i className="fa-brands fa-opencart fa-lg text-primary"></i>
            <h1 className="text-3xl font-extrabold logo">Fresh Cart</h1>
            <ul className="hidden lg:flex space-x-4">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-semibold"
                      : "hover:text-primary"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-semibold"
                      : "hover:text-primary"
                  }
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-semibold"
                      : "hover:text-primary"
                  }
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/brands"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-semibold"
                      : "hover:text-primary"
                  }
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cash"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-semibold"
                      : "hover:text-primary"
                  }
                >
                  Orders
                </NavLink>
              </li>
            </ul>
          </div>
 
          <div className="flex items-center space-x-5">
            
            {token && (
              <div className="flex items-center space-x-5">
                <NavLink to="/fav">
                  <FaHeart size={24} color="green" />
                </NavLink>
                <div className="relative">
                  <NavLink to="/cart">
                    <FaShoppingCart size={24} color="green" />
                  </NavLink>
                  <div className="absolute -top-2 -right-3 text-xs bg-green-500 text-white size-5 text-center rounded-full leading-5">
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
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary font-semibold"
                        : "hover:text-primary"
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/reg"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary font-semibold"
                        : "hover:text-primary"
                    }
                  >
                    Register
                  </NavLink>
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

      {/* Mobile Menu  */}
      {isMobOpen && (
        <div className="lg:hidden fixed top-[90px] left-0 right-0 bg-gray-100 py-4 px-6 text-center shadow-md space-y-4 z-50">
          <NavLink
            to="/"
            onClick={handleCloseMenu}
            className={({ isActive }) =>
              isActive
                ? "block text-primary font-semibold"
                : "block hover:text-primary"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            onClick={handleCloseMenu}
            className={({ isActive }) =>
              isActive
                ? "block text-primary font-semibold"
                : "block hover:text-primary"
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/categories"
            onClick={handleCloseMenu}
            className={({ isActive }) =>
              isActive
                ? "block text-primary font-semibold"
                : "block hover:text-primary"
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/brands"
            onClick={handleCloseMenu}
            className={({ isActive }) =>
              isActive
                ? "block text-primary font-semibold"
                : "block hover:text-primary"
            }
          >
            Brands
          </NavLink>
          <NavLink
            to="/cash"
            onClick={handleCloseMenu}
            className={({ isActive }) =>
              isActive
                ? "block text-primary font-semibold"
                : "block hover:text-primary"
            }
          >
            Orders
          </NavLink>

          {!token && (
            <>
              <NavLink
                to="/login"
                onClick={handleCloseMenu}
                className={({ isActive }) =>
                  isActive
                    ? "block text-primary font-semibold"
                    : "block hover:text-primary"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/reg"
                onClick={handleCloseMenu}
                className={({ isActive }) =>
                  isActive
                    ? "block text-primary font-semibold"
                    : "block hover:text-primary"
                }
              >
                Register
              </NavLink>
            </>
          )}

          {/* Social Icons in mobile */}
          <div className="flex gap-4 justify-center mt-4">
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

          {token && (
            <span
              onClick={Logout}
              className="block cursor-pointer mt-4 text-red-600 font-semibold hover:underline"
            >
              Logout
            </span>
          )}
        </div>
      )}
    </>
  );
}
