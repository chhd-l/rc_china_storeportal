import { Typography, Form } from 'antd'
const { Title } = Typography;

const ApplicableProducts = () => {
    return (
        <div className='bg-white p-4'>
            <Title className='mt-8 mb-6' level={4}>Applicable Products</Title>
            <Form.Item className='flex pl-20'>
                <span>Applicable Products</span>
                <span className='ml-8'>all products</span>
            </Form.Item>
        </div>
    )
}

export default ApplicableProducts