import React, { useState } from "react";
import './Login.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons library

function Login(){

    const [email ,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State variable to track password visibility
    const [errorMessage, setErrorMessage] = useState(""); // State variable to hold error message
    const navigate = useNavigate();

    const handlelogin = (e) => {
        e.preventDefault();
        let data = {
            "email": email,
            "password": password
        };
        axios.post('http://localhost:5000/Login', data)
        .then( result => {
            if(result.data === "Success"){
                localStorage.setItem("isLoggedIn", true);
                navigate('/');
            } else {
                setErrorMessage("Incorrect email or password"); // Set error message state
            }
        })
        .catch(err => console.log(err));
    }

    return(
        <div className="login-parent">
            <h1 className="loginheading">Secure Yourself Today.</h1>

            <div className="w-full max-w-sm mr-60 mlp-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" action="#">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type={showPassword ? "text" : "password"} name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        <button type="button" className="absolute inset-y-2 right-0 flex items-center pr-4 absolute-center-y" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash style={{position:'absolute' , top:'30', right:'10', color: 'white' }} /> : <FaEye style={{position:'absolute' , top:'30',right:'10', color: 'white' }} />} {/* Toggle eye icon based on password visibility */}
                        </button>
                    </div>

                    {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error message */}
                    <button type="submit" onClick={handlelogin} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <a href="./register" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                    </div>
                </form>
            </div>
        </div>
    );
} 

export default Login;
