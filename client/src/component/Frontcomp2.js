import React from "react";
import Transcribe from "./Transcribe";
import DeepgramUploader from "./DeepgramUploader";
import './Frontcomp2.css';
import Card from "./Card";
import CardData from "./CardData";
import FAQs from "./FAQs";


function Frontcomp2(){
    return (
        <div className="parent2">

        <div className="parent3">
        <div className="transcribecontainer">
         <Transcribe />
         
         </div>
         <div className="uploadcontainer">
         <DeepgramUploader />
        
         </div>
        </div>
        <h1 className="cardheading ">Techonologies Used..</h1>
          <div className="cardcontainer">

            
          <Card img = {CardData[0].img}  paragraph = {CardData[0].paragraph} anchor = {CardData[0].anchor} heading = {CardData[0].heading} />
          <Card img = {CardData[1].img}  paragraph = {CardData[1].paragraph} anchor = {CardData[1].anchor} heading = {CardData[1].heading} />
          <Card img = {CardData[2].img}  paragraph = {CardData[2].paragraph} anchor = {CardData[2].anchor} heading = {CardData[2].heading} />

    
          </div>
        
         
        <FAQs />
         
        </div>
    );

}

export default Frontcomp2;