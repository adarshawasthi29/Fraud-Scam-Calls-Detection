
# CallSpy

CallSpy is web application build with a view to protect peoples from various kinds of fruads/scams happening through mobile calling or voice medium . CallSpy can capture the live audio or pre recorded audio files and transcribe into text which then analysed by an LLM to estimate the fraud/spam hiding behind the conversation.


## Built With
- React
- Tailwind CSS
- Node.js
- Express.js
- MongoDB


## Installation

#### 1. Get a free API key at https://ai.google.dev/ for LLM model and for transcribing the audio key a key at https://deepgram.com/product/speech-to-

#### 2. Clone the repo
```bash
  git clone git@github.com:adarshawasthi29/Fraud-Scam-Calls-Detection.git
```
#### 3. Install npm packages in both frontend and backend
```bash
  npm i 
```
#### 4. Set up MongoDB:
- Install MongoDB compass on your system if you haven't already.
- Create you own database and connect in index.js file.

#### 5. Configure environment variables:
- Create a .env file in the frontend and backend directories and add the following variables:
- For Frontend .env
```bash
  DEEPGRAM_API_KEY2=your_deepgram_key
```
- For Backend .env
```bash
  DEEPGRAM_API_KEY=your_deepgram_key
  GEMINI_API_KEY=your_gemini_key
  
```
#### 6. Run Frontend with command
```bash
  npm start
```
#### 7. Run Backend with command
```bash
  node index.js
```

## Usage

- Sign up or log in to your account.
- Provide your personal details as requested.
- Start detecting your Audio through Live Audio Transcript  .
- You can also upload a pre recorded files to detect for scams/frauds.


## Features

- Live Audio Transcript Features - You can live transcribe the communication happening through this feature.
- Pre Recorded Audio File - This feature enable user to upload an audio file which he/she have doubt regarding the scams/fraud and can predict for any kind of scams
- Community Tab - This is an open blog feature in which users can post informations regarding commons fraud patterns, What to do in that situation and how to avoid it.



## Contributing

- We welcome contributions from the community to enhance CallSpy and make it even more valuable for users. If you'd like to contribute, please follow these steps:
 
    #### 1. Fork the repository.
    #### 2. Create a new branch for your feature or bug fix.
    #### 3. Commit your changes and push the branch to your fork.
    #### 4. Submit a pull request with a detailed description of your changes.
  
## Contact

- For questions, feedback, or support, please contact us at adarshawasthi127@gmail.com.

