import React from 'react'
import { Avatar, Row, Col } from 'antd'
import moment from 'moment'

const calcPetAge = (dateStr: string) => {
  const birthday = moment(dateStr, 'YYYY-MM-DD');
  const diffMonth = moment().diff(birthday, 'months');
  if (diffMonth <= 1) {
    return `${diffMonth} month`;
  } else if (diffMonth < 12) {
    return `${diffMonth} months`;
  } else {
    const diffYear = Math.floor(diffMonth / 12);
    const diffMonthAfterYear = diffMonth % 12;
    return `${diffYear} ${diffYear > 1 ? 'years' : 'year'} ${diffMonthAfterYear === 0 ? '' : `${diffMonthAfterYear} ${diffMonthAfterYear > 1 ? 'months' : 'month'}`}`;
  }
};

const Pets = ({ pet } : { pet: any }) => {
  return (
    <div>
      <div className="flex justify-start space-x-4">
        <span className="iconfont icon-a-Frame6 primary-color text-lg" />
        <span>Pet detail</span>
      </div>
      <div className="mt-4 flex items-center space-x-4">
        <div><Avatar shape="square" size={64} src={pet?.image} /></div>
        <div className="flex-grow">
          <div>{pet?.name}</div>
          <Row gutter={10}>
            <Col span={4}><span className="text-gray-400">Age</span></Col>
            <Col span={4}><span className="text-gray-400">Breed</span></Col>
          </Row>
          <Row gutter={10}>
            <Col span={4}>{calcPetAge(moment(pet?.birthday).format('YYYY-MM-DD'))}</Col>
            <Col span={4}>{pet?.breedName}</Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Pets
