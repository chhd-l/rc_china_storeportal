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
import { Link } from 'react-router-dom'
import intl from 'react-intl-universal'

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
    slidesToShow:  data.length>2?3:data.length,
    slidesToScroll: 1,
    autoplay: false,
  };
  const handleClick = async(item: any) => {
    if (await swithStore(item.id)) {
      localStorage.setItem('rc_sc_login_store', item?.name);
      navigator("/dashboard");
    }
  }
  return (
    <div className="h-screen bg-gray1 flex justify-center items-center">
      <div className="swiper-content" style={{width:data.length>2?'800px':data.length>1?'540px':'400px'}}>
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            <Link to="/login/store" style={{float:'left'}} className='text-2xl font-semibold text-black iconfont icon-Frame5' />
            {intl.get('login.please_select_store_of')} <span className="text-red-500">{state.name}</span></h2>
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
            data.map((item:{ logo: string | undefined; name:string; },index:any)=>{
              return(
                <div className='box' key={index}  onClick={()=>handleClick(item)}>
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
