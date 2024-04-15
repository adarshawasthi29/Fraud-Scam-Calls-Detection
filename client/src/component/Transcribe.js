//rranscribe
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Transcribe.css';

const Transcribe = () => {
  const [transcript, setTranscript] = useState('Congratulation sir you got a interest benfit of 5000 as our valuable customer please share the details to get your money');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [socket, setSocket] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [stream, setStream] = useState(null);
  const [response3 ,setResponse3] = useState(null);


  useEffect(() => {
    return () => {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  const startTranscription = async () => {
    try {
      if(localStorage.getItem('isLoggedIn')){
      const newStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log({ newStream });

      if (!MediaRecorder.isTypeSupported('audio/webm')) {
        alert('Browser not supported');
        return;
      }

      const newMediaRecorder = new MediaRecorder(newStream, {
        mimeType: 'audio/webm',
      });
      const KEY = process.env.DEEPGRAM_API_KEY2;
      const newSocket = new WebSocket('wss://api.deepgram.com/v1/listen', [
        'token',
        KEY, // Replace 'YOUR_KEY_HERE' with your actual key
      ]);

      setMediaRecorder(newMediaRecorder);
      setSocket(newSocket);
      setStream(newStream);

      newSocket.onopen = () => {
        console.log({ event: 'onopen' });
        newMediaRecorder.addEventListener('dataavailable', async (event) => {
          if (event.data.size > 0 && newSocket.readyState === 1) {
            newSocket.send(event.data);
          }
        });
        newMediaRecorder.start(1000);
        setIsTranscribing(true);
      };

      newSocket.onmessage = (message) => {
        const received = JSON.parse(message.data);
        const newTranscript = received.channel.alternatives[0].transcript;
        if (newTranscript && received.is_final) {
          console.log(newTranscript);
          setTranscript(prevTranscript => prevTranscript + ' ' + newTranscript);
        }
      };

      newSocket.onclose = () => {
        console.log({ event: 'onclose' });
      };

      newSocket.onerror = (error) => {
        console.log({ event: 'onerror', error });
      };
    }
    else{
      alert('Please LoggedIn First !');
    }
  }
   catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopTranscription = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
    }
    setIsTranscribing(false);
  };

  const detection = async () => {
    try {
      if(localStorage.getItem('isLoggedIn')){
      const formData = new FormData();
      formData.append('transcript', transcript);
      console.log(formData.get('transcript'));


      const response = await axios.post('http://localhost:5000/api/detect', formData);
      console.log(response.data.analysis);
      setResponse3(response.data.analysis);
      console.log(response3);
      }
      else{
        alert('Please LoggedIn First !');
      }
      // Handle response here
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleclear = () => {
    setTranscript("");
  }


  useEffect(() => {
    console.log(response3);
  }, [response3]);


  return (
     <div>
      <div className='transcribefield'>
         <h1 className='liveaudioheading'>Live Transcription</h1>
         <br />
         
         {isTranscribing ? (
        <button onClick={stopTranscription}  type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Stop Listening</button>
      ) : (
        <button onClick={startTranscription}  type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Listening</button>
      )}

      <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleclear}>Clear</button>

      <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={detection}>Detect</button>
      
      <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{isTranscribing ? "Transcribing..." : "Not Connected :"}</label>

         <div style={{ width: "40vw" }} className="inline-block" >
         <textarea id="message" rows="4" className="block p-2.5 w-full  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." value={transcript}></textarea>
         </div>
        
      
     
         <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Result :</label>
        <textarea id="message" rows="4" class="block p-2.5 w-full h-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={response3 }></textarea>

      </div>
    
    </div>
  );
};

export default Transcribe;
