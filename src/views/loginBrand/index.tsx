import React, { useEffect, useState,useRef } from "react";
import Slider from "react-slick";
import "./index.less";
import { useLocation } from 'react-router'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { userFindStoreIds } from '@/framework/api/banner'
import { swithStore } from '@/framework/api/login-user'
import { userAtom } from '@/store/user.store'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'

const LoginBarnd = () => {
  const navigator = useNavigate()
  const { state }: any = useLocation();
  const [userInfo] = useAtom(userAtom)
  const [data, setData] = useState([])
  useEffect(() => {
    getList()
  }, [state.id])
  const getList = async () => {
   let res = await userFindStoreIds("98da256e-9562-40a3-b359-6d59d0dd24cc",userInfo?.id,state.id)
    setData(res)
  }
  const settings = {
    // dots: true,
    speed:500,
    infinite: true,
    slidesToShow: data.length<5?data.length:5,
    slidesToScroll: 1,
    autoplay: false,
  };
  const handleClick = async(item: any) => {
    if (await swithStore(item.id)) {
      navigator("/dashboard");
    }
  }
  return (
    <div className="h-screen bg-gray1 flex justify-center items-center">
      <div className="swiper-content">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Please select a store of <span className="text-red-500">New Balance</span> brand</h2>
          <h4 className="text-base mb-10">Let us provide you with better service</h4>
        </div>
        {/*<div className='potion-left'/>*/}
        {/*<div className="potion-right"/>*/}
        <Slider {...settings}>
          {
            data.map((item:{ logo: string | undefined; name:string; },index)=>{
              return(
                <div className='box'key={index}  onClick={()=>handleClick(item)}>
                  <div className="box1 drop-shadow-md">
                    <img src={item?.logo} alt='' />
                    <div className='text'>{item?.name}</div>
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
export default LoginBarnd;
