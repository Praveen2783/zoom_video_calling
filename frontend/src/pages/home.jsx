import React ,{useContext, useState} from 'react'
import withAuth from '../utiles/withAuth'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/Authcontext';


const home = () => {
    const {addToUserHistory} = useContext(AuthContext)
   
    let navigate = useNavigate()
    const [meetingCode, setMeetingCode] = useState("")
    let handleJoinVideoCall = async() => {
        await  addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

  return (
<>
    <div className='navBar'>
        <div style={{ display: "flex", alignItems: "center" }}>
            <h2 onClick={()=>{
                navigate('/')
            }}>Apna Video Call</h2>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={()=>{
                navigate("/history")
            }}>
                <RestoreIcon/>
               
            </IconButton>
            <p>History</p>
            
            <Button onClick={()=>{
                localStorage.removeItem("token")
                navigate("/auth")
            }}>
                Logout
            </Button>
            
        </div>
      
    </div>

    <div className="meetContainer">
        <div className="leftPanel">
            <div>
            <h2>Providing Quality Video Call Just Like Quality Education</h2>
            <div style={{ display: 'flex', gap: "10px" }}>

                <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" />
                <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>

            </div>
              
            </div>
        </div>
        <div className="rightPanel">
            <img srcSet='/logo3.png'/>
        </div>

    </div>
</>
  )
}

export default withAuth(home)
