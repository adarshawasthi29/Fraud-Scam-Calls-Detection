import React from "react";
import { Route,Routes } from "react-router-dom";
import Frontcomp3 from "./Frontcomp3";
import App from "../App";
import Login from "./Login";
import Signup from "./Signup";
import Blogs from "./Blogs";
import Blogcreate from "./Blogcreate";
import Blogdetail from "./BlogDetail";

export default function Routess(){
    return(
    <Routes>
        <Route path='/' element={<App/>} />
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/blog' element={<Blogs />}></Route>
          <Route path='/blog/create' element={<Blogcreate />} />
          <Route path='/blog/detail' element={<Blogdetail />} />
        
      </Routes>
    )
}