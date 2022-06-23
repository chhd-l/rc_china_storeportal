import React, { useEffect, useState,useRef } from "react";
import Slider from "react-slick";
import src from "@/assets/images/Frame.png"
import "./index.less";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LoginStore = () => {
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
          <h2 className="text-2xl font-semibold">Please select the brand of your store</h2>
          <h4 className="text-base mb-10">Let us provide you with better service</h4>
        </div>
        <div className='potion-left'/>
        <div className="potion-right"/>
        <Slider {...settings}>
          <div className='box'>
            <div className="box1 flex flex-col items-center justify-center drop-shadow-md">
              <img src={src} alt='' className="mb-10"/>
              <div>godve</div>
            </div>
          </div>
          <div className='box'>
            <div className="box1 flex flex-col items-center justify-center drop-shadow-md">
              <img src={src} alt='' className="mb-10"/>
              <div>godve</div>
            </div>
          </div>
          <div className='box'>
            <div className="box1 flex flex-col items-center justify-center drop-shadow-md">
              <img src={src} alt='' className="mb-10"/>
              <div>godve</div>
            </div>
          </div>
          <div className='box'>
            <div className="box1 flex flex-col items-center justify-center drop-shadow-md">
              <img src={src} alt='' className="mb-10"/>
              <div>godve</div>
            </div>
          </div>
          <div className='box'>
            <div className="box1 flex flex-col items-center justify-center drop-shadow-md">
              <img src={src} alt='' className="mb-10"/>
              <div>godve</div>
            </div>
          </div>
          <div className='box'>
            <div className="box1 flex flex-col items-center justify-center drop-shadow-md">
              <img src={src} alt='' className="mb-10"/>
              <div>godve</div>
            </div>
          </div>
          <div className='box'>
            <div className="box1 flex flex-col items-center justify-center drop-shadow-md">
              <img src={src} alt='' className="mb-10"/>
              <div>godve</div>
            </div>
          </div>
        </Slider>
      </div>
    </div>

  );
};
export default LoginStore;
