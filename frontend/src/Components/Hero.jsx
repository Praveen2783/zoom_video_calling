// import { useState } from "react";
// import { Button, IconButton, TextField } from '@mui/material';
import React, { useContext, useState } from 'react'
// import withAuth from '../utiles/withAuth'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { TextField } from '@mui/material';
import { SignInButton, useSession, useUser } from '@clerk/clerk-react';
// import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/Authcontext';

export default function Hero() {

  const { isSignedIn } = useSession();
  const { user } = useUser();
  console.log(user);


  const { addToUserHistory } = useContext(AuthContext)

  let navigate = useNavigate()
  const [meetingCode, setMeetingCode] = useState("")
  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode)
    navigate(`/${meetingCode}`)
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center text-center bg-gradient-to-br from-blue-600 to-indigo-800 text-white px-6 py-20">



      {isSignedIn ?

        <div className='flex'>
          <div className="max-w-3xl">
            <h1 className="text-5xl font-extrabold mb-6">
              Seamless Video Calling for Teams & Professionals
            </h1>
            <p className="text-xl mb-8">
              Host secure, high-quality video meetings with just a click.
            </p>
            <div className="space-x-4">
              <TextField onChange={e => setMeetingCode(e.target.value)} placeholder='Meeting Code' variant="outlined" className='bg-white rounded-2xl' />
              <button onClick={handleJoinVideoCall} className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-700 transition ml-5 " >
                Join
              </button>
            </div>
          </div>


        </div>
        :
        <div className="max-w-3xl">
          <h1 className="text-5xl font-extrabold mb-6">
            Seamless Video Calling for Teams & Professionals
          </h1>
          <p className="text-xl mb-8">
            Host secure, high-quality video meetings with just a click.
          </p>
          <div className="space-x-4">
            <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-100 transition hover:cursor-pointer">
              <SignInButton>
                Get Started Free
              </SignInButton>

            </button>
            <button onClick={()=>{
              window.location.href = "/000"
            }} className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-700 transition">
               Join as Guest
            </button>
          </div>
        </div>
      }

    </section>
  );
}
