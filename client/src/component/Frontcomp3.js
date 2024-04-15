import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Frontcomp3.css';
import data from "./Data";

function Frontcomp3(){


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay:true
      };

    return (
        <div className="w-3/4 m-auto">
         <div className="Slides">
         <h1 className="communityHeading">Our Community</h1>
         <Slider {...settings}>
            {data.map((d) => (
                <div className="bg-white h-[350px] flex  text-black rounded-xl"> 
                    <div className="h-56 rounded-t-xl bg-white flex   justify-center items-center">
                    <img  src={d.img} alt=""  className=" imagerotate h-44 w-44 rounded-full "/>
                    </div> 
                    <div className=" content flex flex-col justify-center items-center  p-4">
                    <p className="text-xl font-semibold">{d.name}</p>
                    <p>{d.review.split(' ').slice(0,10).join(' ')}</p>
                    <button className="bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl">Read More</button>
                    </div>
                </div>


            ))}
            </Slider>
         </div>
          
        </div>
    );
};

export default Frontcomp3;