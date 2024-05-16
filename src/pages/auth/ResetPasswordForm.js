import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast, Toaster } from "react-hot-toast";
import backgroundPhoto from "../../assets/background.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ResetPasswordForm = () => {
  const url = "http://localhost:8080";
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { resetPassword } = useAuth(); // Assuming useAuth provides resetPassword functionality
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("token");
  const navigate = useNavigate();
  const [validToken, setValidToken] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get(`${url}/auth/validate-reset-token/${resetToken}`);
        if (response.data.valid) {
          setValidToken(true);
        } else {
          setValidToken(false);
        }
      } catch (error) {
        console.error("Error validating reset token:", error.message);
        setValidToken(false);
      }
    };

    if (resetToken) {
      validateToken();
    }
  }, [resetToken]);

  const validateForm = () => {
    return newPassword.trim() !== "" && confirmNewPassword.trim() !== "" && newPassword === confirmNewPassword;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (validToken && validateForm()) {
      try {
        const response = await axios.put(`${url}/auth/reset-password/${resetToken}`, {
          newPassword: newPassword,
        });

        if (response.status === 200) {
          toast.success("Password reset successful.");
        } else {
          toast.error("Password reset failed. Please try again later.");
        }
      } catch (error) {
        console.error("Error resetting password:", error.message);
        toast.error("Password reset failed. Please try again later.");
      }
    } else {
      toast.error("Password reset failed: Please make sure the passwords match and are not empty.");
    }
  };

  return (
    <div
      className="object-cover-reset absolute inset-0 flex justify-center items-center"
      style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", height: "100vh" }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="card bg-white shadow-lg rounded-md p-8">
        {validToken ? (
          <form className="flex flex-col items-left text-neutral-100" onSubmit={handleResetPassword}>
            <h2 className="text-2xl font-bold mb-3">Reset SieLala Password</h2>

            <br></br>

            <div className="flex justify-between">
              <label htmlFor="newPassword" className="text-sm">
                New Password:{" "}
              </label>
            </div>

            <div className="flex justify-between">
              <input type={showPassword ? "text" : "password"} id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" className="input-field" />

              <button type="button" onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
            </div>

            <br></br>

            <div className="flex justify-between">
              <label htmlFor="confirmNewPassword" className="text-sm">
                Confirm New Password:{" "}
              </label>
            </div>

            <div className="flex justify-between">
              <input type={showConfirmPassword ? "text" : "password"} id="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder="Confirm new password" className="input-field" />

              <button type="button" onClick={() => setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword)}>
                <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
              </button>
            </div>

            <br></br>

            <button type="submit" className="button-pink w-full">
              Reset Password
            </button>

            <Link to="/login" className="text-sm mt-2 text-neutral-100" style={{ textDecoration: "underline" }}>
              Back to Login
            </Link>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-3">Reset SieLala Password</h2>
            <div className="text-red-500">Reset Password Token is invalid. Please try again with a valid token.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordForm;
