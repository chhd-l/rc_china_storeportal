import { Form, Image } from "antd";
import moment from "moment";

const Finishedproductdisplay = () => {
    return (
        <Form.Item
            shouldUpdate={(prevValues, curValues) => 
                prevValues.Image !== curValues.Image || prevValues.Name !== curValues.Name 
                || prevValues.Description !== curValues.Description || prevValues.Usage !== curValues.Usage
            }
            className="w-96 h-72 absolute top-32 right-32"
        >
            {
                ({ getFieldValue }) => {
                    const imgUrl = getFieldValue('Image')?.file?.response?.url || ''
                    const name = getFieldValue('Name') || ''
                    const Description = getFieldValue('Description') || ''
                    const Usage = getFieldValue('Usage') || ''
                    const startUsage = Usage ? moment(Usage[0]).format('YYYY-MM-DD') : ''
                    const endtUsage = Usage ? moment(Usage[1]).format('YYYY-MM-DD') : ''
                    return (
                        <div className="w-96 h-72">
                            <div className="h-10 CoilingCenter" />
                            <div className="h-full bg-gray-100 py-2 ">
                                <div className="h-28 Notreceived flex items-center">
                                    <div className="py-3 pl-4 h-full">
                                        <div className="h-full w-24 flex flex-col">
                                            {
                                                imgUrl ? (
                                                    <Image
                                                        className="w-5/6"
                                                        src={imgUrl}
                                                        preview={false}
                                                    />
                                                ) : <div className="flex-1 w-5/6 h-full" />
                                            }
                                            <span className='text-red-600' style={{ fontSize: '1px' }}>{name}</span>
                                        </div>
                                    </div>
                                    <div className="w-full h-28 py-3 px-4 relative">
                                        <div style={{ fontSize: '1px' }} className="text-gray-400 w-full h-full flex flex-col justify-between">
                                            <div>
                                                <div className="text-red-600">{Description}</div>
                                                <div>有效期</div>
                                                <div>{startUsage + '-' + endtUsage}</div>
                                            </div>
                                            <div className="absolute bottom-2 right-6 py-1 bg-red-600 rounded w-16 text-center text-white flex items-center justify-center">立即使用</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">Note: One customer can only use once.</div>
                        </div>
                    )
                }
            }
        </Form.Item>
    )
}

export default Finishedproductdisplay