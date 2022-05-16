import IconFont from '@/components/common/IconFont';
import { CardType } from "../modules/conten";

const Card = ({ title, span, icon, backColor }: CardType) => {
    return (
        <div style={{ width: '33%', backgroundColor: '#F9FAFB' }} className='flex items-center justify-between p-4'>
            <div className='flex' style={{ backgroundColor: backColor, borderRadius: '50%', width: '60px', height: '60px' }} >
                <IconFont className='m-auto' style={{ fontSize: '30px' }} type={icon} />
            </div>
            <div className='flex flex-col justify-between w-4/5'>
                <div className='mb-1'>{title}</div>
                <span className='text-gray-500' style={{ fontSize: '10px', lineHeight: '14px' }} >{span}</span>
            </div>
        </div>
    )
}

export default Card