import React from 'react'
import "../App.css";
import { Link } from 'react-router-dom';
import Hero from '../Components/Hero';
import Features from '../Components/Features';
import Testimonials from '../Components/Testimonials';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';


function landing() {

  return (
<>
  
     <div className="bg-white text-gray-900">
     <Navbar/>
    <Hero/>
    <Features/>
    <Testimonials/>
    <Footer/>
    
    </div>
</>
  )
}

export default landing
