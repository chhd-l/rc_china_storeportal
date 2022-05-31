import React from 'react'
import comingsoon from '@/assets/images/comingsoon.png'
import { ContentContainer, InfoContainer } from '@/components/ui'

const ComingSoon = () => {
  return (
    <ContentContainer>
      <InfoContainer>
        <div className="flex justify-center items-center py-40">
          <img src={comingsoon} alt="" className="comingsoon" />
        </div>
      </InfoContainer>
    </ContentContainer>
  )
}
export default ComingSoon
