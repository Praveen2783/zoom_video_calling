let Is_PROD =true;
const server=  Is_PROD?
  "https://zoom-video-calling.onrender.com" :
  "http://localhost:8000"
  


export default server