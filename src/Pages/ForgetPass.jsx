 import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordSteps() {
  const [step, setStep] = useState(1); // 1 = Email, 2 = Code, 3 = New Password
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const navigate = useNavigate();

  // STEP 1 
  const handleSendEmail = async (e) => {
    e.preventDefault();
    toast.loading("Sending reset email...");
    try {
      await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", { email });
      toast.dismiss();
      toast.success("Code sent to email");
      setStep(2);
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  // STEP 2 
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    toast.loading("Verifying code...");
    try {
      await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", { resetCode });
      toast.dismiss();
      toast.success("Code verified successfully!");
      setStep(3);
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || "Invalid code");
    }
  };

  // STEP 3 
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== rePassword) {
      return toast.error("Passwords do not match");
    }

    try {
      toast.loading("Resetting password...");
      await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        email,
        newPassword,
        resetCode,
      });

      toast.dismiss();
      toast.success("Password reset successfully!");
      navigate("/");
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6 pt-32 max-w-sm mx-auto text-center">
      {step === 1 && (
        <>
          <h2 className="text-2xl font-bold text-primary mb-4">Forgot your password?</h2>
          <p className="text-gray-600 mb-6">Your password will be reset by email.</p>
          <form onSubmit={handleSendEmail}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="bg-primary hover:bg-darkPrimary text-white w-full py-2 rounded">Next</button>
          </form>
        </>
      )}

      {step === 2 && (
        <>
           
          <h2 className="text-2xl font-bold text-primary mb-2">Check your email</h2>
          <p className="text-gray-600 mb-6">Reset code sent to your email</p>
          <form onSubmit={handleVerifyCode}>
            <input
              type="text"
              placeholder="Enter Reset Code"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              required
            />
            <button className="bg-primary hover:bg-darkPrimary text-white w-full py-2 rounded">Next</button>
          </form>
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="text-2xl font-bold text-primary mb-4">Create New Password</h2>
          <form onSubmit={handleResetPassword}>
            <input
              type="password"
              placeholder="New Password"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              required
            />
            <button className="bg-primary hover:bg-darkPrimary text-white py-2 px-4 rounded w-full">
              Reset Password
            </button>
          </form>
        </>
      )}
    </div>
  );
}
