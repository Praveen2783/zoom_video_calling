import React from 'react'
import "../App.css";
import { Link } from 'react-router-dom';


function landing() {

  return (
    <div className='landingPageConatiner'> 
      <nav>
        <div className='navHeader'>
          <h2> <span style={{color:"#FF9839"}}>Doctor</span> Video Call</h2>
        </div>
        <div className='navList'>
          <Link to={"aljk23"}>Join as Guest</Link>
          <Link to={"/auth"}> Register</Link>
          <div role='button'>
          <Link to={"/auth"}>Login </Link>
          </div>
        </div>
      </nav>
      <div className="main">
        <div className="content">
         <h1><span style={{color:"#FF9839"}}> Connect</span> with your Health Professional Doctors</h1>
         <p>Health care is delivered by health professionals by using video call</p>
         <div role='button'>
            <Link to={"/auth"}>
              Get Started
            </Link>
         </div>
        </div>
        <div className="img">
          <img src="public\mobile.png" alt="" />

        </div>
      </div>
    </div>
  )
}

export default landing
