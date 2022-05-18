import { ContentContainer } from "@/components/ui"
import { Button, Form } from "antd";
import { useState } from "react";
import BasicInformation from './components/BasicInformation';
import RuleSettings from './components/RuleSettings';
import ApplicableProducts from './components/ApplicableProducts';
import './Style.less'

const CreateNewVoucher = () => {
    const [VoucherType, setVoucherType] = useState('Shop Voucher')

    return (
        <ContentContainer>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 6 }}
                className='CreateNewVoucher'
                onFinish={(v) => {
                    console.log('v', v)
                }}
            >
                <BasicInformation VoucherType={VoucherType} setVoucherType={setVoucherType} />
                <RuleSettings />
                <ApplicableProducts />
                <Form.Item className="w-full flex items-center justify-end pr-4 py-8">
                    <Button htmlType="button" onClick={() => { }}>
                        Reset
                    </Button>
                    <Button className="ml-4" type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </ContentContainer>
    )
}

export default CreateNewVoucher