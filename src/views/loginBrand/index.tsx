import React, { useEffect, useState,useRef } from "react";
import Slider from "react-slick";
import src from "@/assets/images/cs.jpg"
import "./index.less";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LoginBarnd = () => {
  const settings = {
    // dots: true,
    speed:500,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
  };
  return (
    <div className="h-screen bg-gray1 flex justify-center items-center">
      <div className="swiper-content">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Please select a store of <span className="text-red-500">New Balance</span> brand</h2>
          <h4 className="text-base mb-10">Let us provide you with better service</h4>
        </div>
        <div className='potion-left'/>
        <div className="potion-right"/>
        <Slider {...settings}>
          <div className='box'>
            <div className="box1 drop-shadow-md">
              <img src={src} alt='' />
              <div className='text'>godve godve godve godve godve godve godve godve godve godve godve godve</div>
            </div>
          </div> <div className='box'>
            <div className="box1 drop-shadow-md">
              <img src={src} alt='' />
              <div className='text'>godve godve godve godve</div>
            </div>
          </div> <div className='box'>
            <div className="box1 drop-shadow-md">
              <img src={src} alt='' />
              <div className='text'>godve godve godve godve</div>
            </div>
          </div> <div className='box'>
            <div className="box1 drop-shadow-md">
              <img src={src} alt='' />
              <div className='text'>godve godve godve godve</div>
            </div>
          </div>
          <div className='box'>
            <div className="box1 drop-shadow-md">
              <img src={src} alt='' />
              <div className='text'>godve godve godve godve</div>
            </div>
          </div>
          <div className='box'>
            <div className="box1 drop-shadow-md">
              <img src={src} alt='' />
              <div className='text'>godve godve godve godve</div>
            </div>
          </div>
        </Slider>
      </div>
    </div>

  );
};
export default LoginBarnd;
