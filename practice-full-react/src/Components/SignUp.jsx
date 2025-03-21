import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import register from '../assets/register.jpg';


const SignUp = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (credentials.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }
    if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Email is invalid";
    }
    if (credentials.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    if (credentials.password !== credentials.cpassword) {
      newErrors.cpassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Only proceed if validation passes
      const { name, email, password } = credentials;
      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/registeruser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
          }
        );

        const data = await response.json();
        console.log("form submitted", data);
        if (data) {
          localStorage.setItem("token", data.authToken);
          navigate("/login");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-start justify-center min-h-screen pt-8 bg-gray-50 ">
      <div className="max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl h-[550px]">
        <div className="flex flex-col md:flex-row">
          {/* Image Side */}
          <div className="h-full md:w-1/2">
            <img
              src={register}
              alt="Signup"
              className="w-full h-[550px] object-cover rounded-bl-2xl"
            />
          </div>

          {/* Form Side */}
          <div className="p-8 md:w-1/2 lg:p-12">
            <div className="mb-2">
              <h2 className="text-3xl font-bold text-gray-900">
                Register to continue
              </h2>
              <div className="w-20 h-1 mt-2 bg-blue-600"></div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={credentials.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={credentials.password}
                    onChange={handleChange}
                    className={`mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute -translate-y-1/2 right-3 top-1/2"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    name="cpassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={credentials.cpassword}
                    onChange={handleChange}
                    className={`mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      errors.cpassword ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute -translate-y-1/2 right-3 top-1/2"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.cpassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.cpassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 mb-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign up
              </button>
            </form>

            <p className="text-sm text-center text-gray-600">
              Already registered?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

























