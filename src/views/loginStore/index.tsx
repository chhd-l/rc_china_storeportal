import React, { useEffect, useState,useRef } from "react";
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import src from "@/assets/images/Frame.png"
import "./index.less";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { userFindBrandIds } from '@/framework/api/banner'
import { userAtom } from '@/store/user.store'
import intl from 'react-intl-universal'

const LoginStore = () => {
  const [userInfo] = useAtom(userAtom)
  const navigate = useNavigate()
  const [data, setData] = useState([])
  useEffect(() => {
    list()
  }, [])
  const list = async() => {
    const id = userInfo?.id
    let res=await userFindBrandIds("98da256e-9562-40a3-b359-6d59d0dd24cc",id)
    console.log(res)
    setData(res)
  }
  const settings = {
    // dots: true,
    speed:500,
    infinite: true,
    slidesToShow: data.length>2?3:data.length,
    slidesToScroll: 1,
    autoplay: false,
  };
  const handleClick = async(item: any) => {
    localStorage.setItem('rc_sc_login_brand', item.name);
    navigate("/login/brand", { state: { id: item.id, name:item.name } });
  }
  return (
    <div className="h-screen bg-gray1 flex justify-center items-center">
      <div className="swiper-contents" style={{width:data.length>2?'800px':data.length>1?'540px':'400px'}}>
        <div className="text-center">

          <h2 className="text-2xl font-semibold">{intl.get('login.please_select_brand_of_store')}</h2>
          <h4 className="text-base mb-10">{intl.get('login.provide_better_service')}</h4>
        </div>
        {
          data.length>3? <div className='potion-left'/>:null
        }
        {
          data.length>3?<div className="potion-right"/>:null
        }
        <Slider {...settings}>
          {
            data.map((item: { logo: string | undefined; name:string; }, index: any)=>{
              return(
                <div className='box' key={index} onClick={()=>handleClick(item)}>
                  <div className="boxs flex flex-col items-center justify-center drop-shadow-md">
                    <img src={item.logo} alt='' className="mb-10"/>
                    <div>{item.name}</div>
                  </div>
                </div>
                )
            })
          }
        </Slider>
      </div>
    </div>

  );
};
export default LoginStore;
