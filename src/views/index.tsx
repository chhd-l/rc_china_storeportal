import React, { useEffect, useState } from 'react'
import comingsoon from "../assets/images/comingsoon.png"
import "./index.less"
const Home = () => {
  return (
    <div className="home-container">
      {/* <div className='text-xl'>Home</div>
      <div className='text-xs'>Home</div> */}
      <img src={comingsoon} alt="" className='comingsoon'/>
    </div>
  )
}
export default Home
