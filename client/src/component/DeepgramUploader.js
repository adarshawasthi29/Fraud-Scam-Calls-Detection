// import React, { useState } from 'react';
// import axios from 'axios';

// const DeepgramUploader = () => {
//   const [file, setFile] = useState(null);
//   const [transcription, setTranscription] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     // if (!file) {
//     //   alert('Please select an audio file to upload');
//     //   return;
//     // }

//     // setLoading(true);

//     const formData = new FormData();
//     formData.append('file', file);
//     const response = await axios.post('http://localhost:5000/api/transcribe',formData)
//     console.log(response.data.transcription)
//     .then(res => {})
//     .catch(er => console.log(er))

//     // try {
//     //     // console.log('Size of file in FormData:', formData.get('file').size);
//     //     const response = await axios.post('http://localhost:5000/api/transcribe', formData);
//     //   setTranscription(response.data.transcription);
//     // } catch (error) {
//     //   console.error('Error:', error);
//     // }

//     // setLoading(false);
//   };

//   return (
//     <div>
//       <h2>Deepgram Audio Uploader</h2>
//       <input type="file" accept="audio/*" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={loading || !file}>
//         {loading ? 'Uploading...' : 'Upload'}
//       </button>
//       {/* {transcription && (
//         <div>
//           <h3>Transcription:</h3>
//           <p>{transcription}</p>
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default DeepgramUploader;

import React, { useState } from 'react';
import axios from 'axios';
import { createClient } from "@deepgram/sdk";
import './DeepgramUploader.css'

const DeepgramUploader = () => {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [loading, setLoading] = useState(false);
  const [response2,setResponse] = useState('')

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select an audio file to upload');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      if(localStorage.getItem('isLoggedIn')){
        const response = await axios.post('http://localhost:5000/api/transcribe', formData);
        setTranscription(response.data.transcript1);
        setResponse(response.data.analysis);
      }
      else{
        alert('Please LoggedIn First !');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setLoading(false);
  };

  return (
    <div >
      
      <div className='uploadfield'>
      <h1 className="uploadaudioheading">Upload an Audio File</h1>
      <br />
      <input class="inline w-sm text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="large_size" type="file" accept='audio/*' onChange={handleFileChange}/>
      <button  onClick={handleUpload} disabled={loading || !file} type="button" class="text-white ml-2 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{loading ? 'Uploading...' : 'Upload'}</button>
      </div>
     
        <div>
         <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Transcription : </label>
         <div style={{ width: "40vw" }} class="inline-block">
         <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Transcription..." value={transcription}></textarea>
        </div>
    
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Result :</label>
        <textarea id="message" rows="4" class="block p-2.5 w-full h-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={response2 }></textarea>

        </div>
    </div>
  );
};

export default DeepgramUploader;

