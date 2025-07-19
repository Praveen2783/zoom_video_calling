/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate as useNaigate } from 'react-router-dom'; 
import "../styles/videoComponent.css";
import { Link } from 'react-router-dom';
import io from "socket.io-client";
import {

  Badge, IconButton,
  TextField
} from '@mui/material';
import { Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff'

import CallEndIcon from '@mui/icons-material/CallEnd'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import ChatIcon from '@mui/icons-material/Chat'
import SendIcon from '@mui/icons-material/Send';
import server from '../environment';
// import server from '../environment';


const server_url = server;

var connections = {};

const peerConfigConnections = {
  'iceServers': [
    { "urls": "stun:stun.l.google.com:19302" }
  ]
}

export default function VideoMeetComponent() {

  var socketRef = useRef();
  let socketIdRef = useRef();

  let localVideoref = useRef();

  let [videoAvailable, setVideoAvailable] = useState(true);

  let [audioAvailable, setAudioAvailable] = useState(true);

  let [video, setVideo] = useState([]);

  let [audio, setAudio] = useState();

  let [screen, setScreen] = useState();

  let [showModal, setModal] = useState(true);

  let [screenAvailable, setScreenAvailable] = useState();

  let [messages, setMessages] = useState([])

  let [message, setMessage] = useState("");

  let [newMessages, setNewMessages] = useState(3);

  let [askForUsername, setAskForUsername] = useState(true);

  let [username, setUsername] = useState("");

  const videoRef = useRef([])

  let [videos, setVideos] = useState([])

  // TODO
  // if(isChrome() === false) {


  // }

  useEffect(() => {
      console.log("HELLO")
      getPermissions();

  })

  let getDislayMedia = () => {
      if (screen) {
          if (navigator.mediaDevices.getDisplayMedia) {
              navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                  .then(getDislayMediaSuccess)
                  .then((stream) => { })
                  .catch((e) => console.log(e))
          }
      }
  }

  const getPermissions = async () => {
      try {
          const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoPermission) {
              setVideoAvailable(true);
              console.log('Video permission granted');
          } else {
              setVideoAvailable(false);
              console.log('Video permission denied');
          }

          const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
          if (audioPermission) {
              setAudioAvailable(true);
              console.log('Audio permission granted');
          } else {
              setAudioAvailable(false);
              console.log('Audio permission denied');
          }

          if (navigator.mediaDevices.getDisplayMedia) {
              setScreenAvailable(true);
          } else {
              setScreenAvailable(false);
          }

          if (videoAvailable || audioAvailable) {
              const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
              if (userMediaStream) {
                  window.localStream = userMediaStream;
                  if (localVideoref.current) {
                      localVideoref.current.srcObject = userMediaStream;
                  }
              }
          }
      } catch (error) {
          console.log(error);
      }
  };

  useEffect(() => {
      if (video !== undefined && audio !== undefined) {
          getUserMedia();
          console.log("SET STATE HAS ", video, audio);

      }


  }, [video, audio])
  let getMedia = () => {
      setVideo(videoAvailable);
      setAudio(audioAvailable);
      connectToSocketServer();

  }




  let getUserMediaSuccess = (stream) => {
      try {
          window.localStream.getTracks().forEach(track => track.stop())
      } catch (e) { console.log(e) }

      window.localStream = stream
      localVideoref.current.srcObject = stream

      for (let id in connections) {
          if (id === socketIdRef.current) continue

          connections[id].addStream(window.localStream)

          connections[id].createOffer().then((description) => {
              console.log(description)
              connections[id].setLocalDescription(description)
                  .then(() => {
                      socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                  })
                  .catch(e => console.log(e))
          })
      }

      stream.getTracks().forEach(track => track.onended = () => {
          setVideo(false);
          setAudio(false);

          try {
              let tracks = localVideoref.current.srcObject.getTracks()
              tracks.forEach(track => track.stop())
          } catch (e) { console.log(e) }

          let blackSilence = (...args) => new MediaStream([black(...args), silence()])
          window.localStream = blackSilence()
          localVideoref.current.srcObject = window.localStream

          for (let id in connections) {
              connections[id].addStream(window.localStream)

              connections[id].createOffer().then((description) => {
                  connections[id].setLocalDescription(description)
                      .then(() => {
                          socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                      })
                      .catch(e => console.log(e))
              })
          }
      })
  }

  let getUserMedia = () => {
      if ((video && videoAvailable) || (audio && audioAvailable)) {
          navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
              .then(getUserMediaSuccess)
              .then((stream) => { })
              .catch((e) => console.log(e))
      } else {
          try {
              let tracks = localVideoref.current.srcObject.getTracks()
              tracks.forEach(track => track.stop())
          } catch (e) { }
      }
  }





  let getDislayMediaSuccess = (stream) => {
      console.log("HERE")
      try {
          window.localStream.getTracks().forEach(track => track.stop())
      } catch (e) { console.log(e) }

      window.localStream = stream
      localVideoref.current.srcObject = stream

      for (let id in connections) {
          if (id === socketIdRef.current) continue

          connections[id].addStream(window.localStream)

          connections[id].createOffer().then((description) => {
              connections[id].setLocalDescription(description)
                  .then(() => {
                      socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                  })
                  .catch(e => console.log(e))
          })
      }

      stream.getTracks().forEach(track => track.onended = () => {
          setScreen(false)

          try {
              let tracks = localVideoref.current.srcObject.getTracks()
              tracks.forEach(track => track.stop())
          } catch (e) { console.log(e) }

          let blackSilence = (...args) => new MediaStream([black(...args), silence()])
          window.localStream = blackSilence()
          localVideoref.current.srcObject = window.localStream

          getUserMedia()

      })
  }

  let gotMessageFromServer = (fromId, message) => {
      var signal = JSON.parse(message)

      if (fromId !== socketIdRef.current) {
          if (signal.sdp) {
              connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
                  if (signal.sdp.type === 'offer') {
                      connections[fromId].createAnswer().then((description) => {
                          connections[fromId].setLocalDescription(description).then(() => {
                              socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
                          }).catch(e => console.log(e))
                      }).catch(e => console.log(e))
                  }
              }).catch(e => console.log(e))
          }

          if (signal.ice) {
              connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
          }
      }
  }




  let connectToSocketServer = () => {
      socketRef.current = io.connect(server_url, { secure: false })

      socketRef.current.on('signal', gotMessageFromServer)

      socketRef.current.on('connect', () => {
          socketRef.current.emit('join-call', window.location.href)
          socketIdRef.current = socketRef.current.id

          socketRef.current.on('chat-message', addMessage)

          socketRef.current.on('user-left', (id) => {
              setVideos((videos) => videos.filter((video) => video.socketId !== id))
          })

          socketRef.current.on('user-joined', (id, clients) => {
              clients.forEach((socketListId) => {

                  connections[socketListId] = new RTCPeerConnection(peerConfigConnections)
                  // Wait for their ice candidate       
                  connections[socketListId].onicecandidate = function (event) {
                      if (event.candidate != null) {
                          socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
                      }
                  }

                  // Wait for their video stream
                  connections[socketListId].onaddstream = (event) => {
                      console.log("BEFORE:", videoRef.current);
                      console.log("FINDING ID: ", socketListId);

                      let videoExists = videoRef.current.find(video => video.socketId === socketListId);

                      if (videoExists) {
                          console.log("FOUND EXISTING");

                          // Update the stream of the existing video
                          setVideos(videos => {
                              const updatedVideos = videos.map(video =>
                                  video.socketId === socketListId ? { ...video, stream: event.stream } : video
                              );
                              videoRef.current = updatedVideos;
                              return updatedVideos;
                          });
                      } else {
                          // Create a new video
                          console.log("CREATING NEW");
                          let newVideo = {
                              socketId: socketListId,
                              stream: event.stream,
                              autoplay: true,
                              playsinline: true
                          };

                          setVideos(videos => {
                              const updatedVideos = [...videos, newVideo];
                              videoRef.current = updatedVideos;
                              return updatedVideos;
                          });
                      }
                  };


                  // Add the local video stream
                  if (window.localStream !== undefined && window.localStream !== null) {
                      connections[socketListId].addStream(window.localStream)
                  } else {
                      let blackSilence = (...args) => new MediaStream([black(...args), silence()])
                      window.localStream = blackSilence()
                      connections[socketListId].addStream(window.localStream)
                  }
              })

              if (id === socketIdRef.current) {
                  for (let id2 in connections) {
                      if (id2 === socketIdRef.current) continue

                      try {
                          connections[id2].addStream(window.localStream)
                      } catch (e) { }

                      connections[id2].createOffer().then((description) => {
                          connections[id2].setLocalDescription(description)
                              .then(() => {
                                  socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }))
                              })
                              .catch(e => console.log(e))
                      })
                  }
              }
          })
      })
  }

  let silence = () => {
      let ctx = new AudioContext()
      let oscillator = ctx.createOscillator()
      let dst = oscillator.connect(ctx.createMediaStreamDestination())
      oscillator.start()
      ctx.resume()
      return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
  }
  let black = ({ width = 640, height = 480 } = {}) => {
      let canvas = Object.assign(document.createElement("canvas"), { width, height })
      canvas.getContext('2d').fillRect(0, 0, width, height)
      let stream = canvas.captureStream()
      return Object.assign(stream.getVideoTracks()[0], { enabled: false })
  }

  let handleVideo = () => {
      setVideo(!video);
   
      // getUserMedia();
  }
  let handleAudio = () => {
      setAudio(!audio)
      // getUserMedia();
  }

  useEffect(() => {
      if (screen !== undefined) {
          getDislayMedia();
      }
  }, [screen])
  let handleScreen = () => {
      setScreen(!screen);
  }

  let handleEndCall = () => {
      try {
          let tracks = localVideoref.current.srcObject.getTracks()
          tracks.forEach(track => track.stop())
      } catch (e) { }
      window.location.href = "/"
      window.location.replace("/")
  }

  let openChat = () => {
      setModal(true);
      setNewMessages(0);
  }
  let closeChat = () => {
      setModal(false);
  }
  let handleMessage = (e) => {
      setMessage(e.target.value);
  }

  const addMessage = (data, sender, socketIdSender) => {
      setMessages((prevMessages) => [
          ...prevMessages,
          { sender: sender, data: data }
      ]);
      if (socketIdSender !== socketIdRef.current) {
          setNewMessages((prevNewMessages) => prevNewMessages + 1);
      }
  };



  let sendMessage = () => {
      console.log(socketRef.current);
      socketRef.current.emit('chat-message', message, username)
      setMessage("");

      // this.setState({ message: "", sender: username })
  }

  
  let connect = () => {
      setAskForUsername(false);
      getMedia();
  }


  return (
   <div className="min-h-screen bg-gray-100 relative font-sans">
  {/* Navbar */}
  <div className="flex justify-around items-center p-6 bg-white shadow-md">
    <div className="text-2xl font-bold text-indigo-600">VideoCallify</div>
    <Link to="/" onClick={()=>{
      window.location.replace("/")
    }} className="text-gray-700 text-3xl hover:text-indigo-600 font-medium">
      Home
    </Link>
  </div>

  {/* Lobby Screen */}
  {askForUsername ? (
    <div className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-br from-indigo-100 to-purple-100">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
        Enter the Lobby
      </h2>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <TextField
          id="outlined-basic"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          className="bg-white rounded-2xl"
        />
        <button
          onClick={connect}
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          Connect
        </button>
      </div>
      <div className="mt-8 w-64 h-48 rounded-xl shadow-lg overflow-hidden bg-black">
        <video ref={localVideoref} autoPlay muted className="w-full h-full object-cover" />
      </div>
    </div>
  ) : (
    <div className="p-4 md:p-6 space-y-6">
      {/* Chat Modal */}
      {showModal && (
        <div className="fixed top-20 right-6 w-80 h-[500px] bg-white rounded-xl shadow-xl z-50 overflow-hidden flex flex-col">
          <div className="bg-indigo-600 text-white py-3 px-4 font-semibold">
            Chat Room
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length > 0 ? (
              messages.map((item, index) => (
                <div key={index}>
                  <p className="font-bold text-gray-800">{item.sender}</p>
                  <p className="text-sm text-gray-600">{item.data}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No Messages Yet</p>
            )}
          </div>
          <div className="p-3 flex gap-2 bg-white">
            <TextField
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              label="Enter your chat"
              variant="outlined"
              fullWidth
            />
            <Button variant="contained" onClick={sendMessage}>
              Send
            </Button>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center gap-4 mb-4">
        <IconButton onClick={handleVideo} className="bg-gray-800 text-white hover:bg-indigo-600">
          {video ? <VideocamIcon /> : <VideocamOffIcon />}
        </IconButton>
        <IconButton onClick={handleEndCall} className="bg-red-600 text-white hover:bg-red-700">
          <CallEndIcon />
        </IconButton>
        <IconButton onClick={handleAudio} className="bg-gray-800 text-white hover:bg-indigo-600">
          {audio ? <MicIcon /> : <MicOffIcon />}
        </IconButton>
        {screenAvailable && (
          <IconButton onClick={handleScreen} className="bg-gray-800 text-white hover:bg-indigo-600">
            {screen ? <ScreenShareIcon /> : <StopScreenShareIcon />}
          </IconButton>
        )}
        <Badge badgeContent={newMessages} max={999} color="warning">
          <IconButton onClick={() => setModal(!showModal)} className="bg-gray-800 text-white hover:bg-indigo-600">
            <ChatIcon />
          </IconButton>
        </Badge>
      </div>

      {/* Local Video */}
      <div className="mx-auto w-full max-w-md h-60 rounded-xl overflow-hidden shadow-lg bg-black">
        <video ref={localVideoref} autoPlay muted className="w-full h-full object-cover" />
      </div>

      {/* Remote Participants */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {videos.map((video) => (
          <div key={video.socketId} className="rounded-xl overflow-hidden shadow-md bg-black">
            <video
              data-socket={video.socketId}
              ref={(ref) => {
                if (ref && video.stream) {
                  ref.srcObject = video.stream;
                }
              }}
              autoPlay
              className="w-full h-full object-cover"
            ></video>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

  )
}
