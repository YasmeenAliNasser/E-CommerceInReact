import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast"; 



export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  console.log(token);

  const [isLoading, setIsLoading] = useState(true); 

  async function verifyToken(storedToken) {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
        {
          headers: {
            token: storedToken,
          },
        }
      );
      console.log(data);

      setToken(storedToken);
    } catch (error) {
      console.log(error);
      toast.error("حرامي");
      setToken(null);
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false); 
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      verifyToken(storedToken);
    } else {
      setIsLoading(false);   
    }
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center text-xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </AuthContext.Provider>
  );
}


