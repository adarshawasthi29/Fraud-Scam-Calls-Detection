// App.js
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import Transcribe from './component/Transcribe';
import DeepgramUploader from './component/DeepgramUploader';
import Navbar from './component/Navbar';
import Frontcomp1 from './component/Frontcomp1';
import Frontcomp2 from './component/Frontcomp2';
import Frontcomp3 from './component/Frontcomp3';
import Login from './component/Login';
import Signup from './component/Signup';
import FAQs from './component/FAQs';
import Footer from './component/Footer';


function App() {
  const[communit,isCommunit]=useState(false)
  
  return (
    <div className='container1'>
  
       
      <Navbar isCommunit={isCommunit}/>
      <Frontcomp1 />
      <Frontcomp2 />
      
      <Footer />
      
  
    
    </div>
  );
}

export default App;