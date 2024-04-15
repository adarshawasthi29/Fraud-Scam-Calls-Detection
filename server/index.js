require('dotenv').config()
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const { createClient } = require("@deepgram/sdk");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { log } = require('console');
const mongoose = require('mongoose');
const FraudModel = require('./model/fraud.js');
const app = express();
const Blog = require('./model/Blog.js');
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));



mongoose.connect("mongodb://127.0.0.1:27017/FraudCalls");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/audio');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

// Initialize Google Generative AI
const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);


app.post('/api/transcribe', upload.single('file'), async (req, res) => {
  
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;
    const deepgram = createClient(DEEPGRAM_API_KEY);

    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      fs.readFileSync(req.file.path),
      {
        model: "nova-2",
        smart_format: true,
        
      }
    );

    if (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'An error occurred during transcription' });
    }

    // Transcription result
    const transcript1 =result.results.channels[0].alternatives[0].transcript;
    const transcription = "I will provide you the text trancripted from the audio call , you just need to tell me whether the call is fraud call and not , and display fraud percentage and type of fraud the transcript is "+result.results.channels[0].alternatives[0].transcript;

    // Analyze transcription using Google Generative AI
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const analysisResult = await model.generateContent(transcription);
    const response = await analysisResult.response;
    const analysisText = await response.text();
    


    // Send analysis result back to client
    res.status(200).json({ transcript1, analysis: analysisText });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
});

app.post('/api/detect', upload.none(),async (req, res) => {
    try {
      // Access transcript text from request body
      
      const transcription = "I will provide you the text trancripted from the audio call , you just need to tell me whether the call is fraud call and not , and display fraud percentage and type of fraud the transcript is "+ req.body.transcript;
      
  
      // Ensure genAI is properly initialized before using it
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
      // Generate analysis content using Google Generative AI
      const analysisResult = await model.generateContent(transcription);
      const response = await analysisResult.response;
      const analysisText = await response.text();
       
      // Send analysis text back to client
      res.status(200).json({ analysis: analysisText });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  });
  

 app.post('/register' , (req ,res) => {
 
  FraudModel.create(req.body)
  .then(fraudcalls => {
    console.log(fraudcalls);
    res.json(fraudcalls)
  })
  .catch(err => res.json(err))
 })

 app.post('/Login' , async (req,res) => {
  
  const {email, password} = req.body;
  FraudModel.findOne({email:email})
  .then( user => {
    if(user){
      console.log(user)
      if(user.password === password){
        res.json("Success")
      }
      else{
        res.json("The password is incorrect")
      }
    }
    else{
      res.json("No record found")
    }
  })
 })


 app.get('/getblogs', async (req, res) => {
  try {
      const blogs = await Blog.find();
      res.json(blogs);
  } catch (error) {
      console.error('Error fetching blogs', error);
      res.status(500).json({ error: 'Error fetching blogs' });
  }
});

// Create a new blog post
app.post('/createblog', async (req, res) => {
  try {
      const { author, title, description, content } = req.body;
      const newBlog = new Blog({ author, title, description, content });
      const savedBlog = await newBlog.save();
      res.json(savedBlog);
  } catch (error) {
      console.error('Error creating blog', error);
      res.status(500).json({ error: 'Error creating blog' });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
