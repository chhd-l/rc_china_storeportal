
import { useNavigate } from 'react-router'
import './index.less'
import { body } from './modules/content'

const Dashboard = () => {
    const navigator = useNavigate()
    return <div className="dashboard flex items-center justify-between flex-wrap">
        {
            body.map((item: any, idx: number) => (
                <div className='block' key={idx}>
                    <div className={`${item.img} bgImg cursor-pointer`} onClick={() => navigator(item.url)}/>
                    <div className='title'>{item.title}</div>
                    <div className='span'>{item.span}</div>
                </div>
            ))
        }
    </div>
}

export default Dashboard