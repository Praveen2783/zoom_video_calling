 
import "./App.css"
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import LandingPage from './pages/landing';
import AuthenticationPage from "./pages/authentication";
import { AuthProvider } from "./contexts/Authcontext";
import VideoMeetPage from './pages/videoMeet'
import HomePage from './pages/home';
import HistoryPage from './pages/history';

function App() {
  
  return (
    <>
      <Router>
        <AuthProvider>

       
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/auth" element={<AuthenticationPage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/history" element={<HistoryPage/>} />
          <Route path="/:url" element={<VideoMeetPage/>} />
        </Routes>
      </AuthProvider>
      </Router>
    
    </>
  )
}

export default App
