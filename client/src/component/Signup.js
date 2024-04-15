import React, { useState } from "react";
import './Signup.css';
import axios from "axios";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Login from "./Login";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup(){

    const [name,setName] = useState();
    const [email ,setEmail] = useState();
    const [password,setPassword] = useState();
    const [number,setnumber] = useState();
    const [showPassword, setShowPassword] = useState(false);
    
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        console.log(number);
        axios.post('http://localhost:5000/register',{name,email,password,number})
        .then(result => {console.log(result)
            localStorage.setItem("isLoggedIn", true);
             navigate('/Login')
        })
        .catch(err => console.log(err))
    }

    return(
        <div className="signup-parent">

        <h1 className="signupheading">Secure Yourself Today.</h1>
             

<div className="w-full max-w-sm mr-60 mlp-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form className="space-y-6" action="#">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign up to our platform</h5>
        <div className="relative">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
            <input type="name" name="name" id="name"  onChange ={(e) =>setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
        </div>
       
        <div className="relative">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" name="email" id="email"  onChange ={(e) =>setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
           
        </div>
        <div className="relative">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="••••••••"  onChange ={(e) =>setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
            <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-4 absolute-center-y" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash style={{position:'absolute' , top:'40', right:'10', color: 'white' }} /> : <FaEye style={{position:'absolute' , top:'40',right:'10', color: 'white' }} />} {/* Toggle eye icon based on password visibility */}
            </button>
        </div>
        <div className="relative">
            <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
            <input type="number" name="number" id="number" placeholder="Phone-number" onChange ={(e) =>setnumber(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
          
        </div>
        <div className="flex items-start">
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                </div>
                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
            </div>
        </div>
        <button type="submit" onClick={handleSignup} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create account</button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already registered? <Link to='/Login'><a href="" className="text-blue-700 hover:underline dark:text-blue-500">Login to your account</a></Link>
        </div>
    </form>
</div>


        </div>
    );
}

export default Signup;
