import { Form, Image } from 'antd'
import moment from 'moment'
import intl from 'react-intl-universal'

const Finishedproductdisplay = () => {
  return (
    <Form.Item
      shouldUpdate={(prevValues, curValues) =>
        prevValues.Image !== curValues.Image ||
        prevValues.voucherName !== curValues.voucherName ||
        prevValues.voucherDescription !== curValues.voucherDescription ||
        prevValues.times !== curValues.times ||
        prevValues.discountValue !== curValues.discountValue ||
        prevValues.discountType !== curValues.discountType
      }
      className="w-96 h-72 absolute top-32 right-32"
    >
      {({ getFieldValue }) => {
        const imgUrl = getFieldValue('Image')?.file?.response?.url || ''
        const voucherName = getFieldValue('voucherName') || ''
        const Description = getFieldValue('voucherDescription') || ''
        const times = getFieldValue('times') || ''
        const startTimes = times ? moment(times[0]).format('YYYY/MM/DD HH:mm') : ''
        const endtTimes = times ? moment(times[1]).format('YYYY/MM/DD HH:mm') : ''
        const discountType = getFieldValue('discountType')
        const discountValue = getFieldValue('discountValue')
        return (
          <div className="w-96 h-72">
            <div className="h-10 CoilingCenter" />
            <div className="h-full bg-gray-100 py-2 ">
              <div className="h-28 Notreceived flex items-center">
                <div className="py-3 pl-4 h-full">
                  <div className="h-full w-24 flex flex-col items-center text-center">
                    {imgUrl ? (
                      <Image width={70} src={imgUrl} preview={false} />
                    ) : (
                      <div className="flex-1 w-5/6 h-full">
                        {discountType === 'PERCENTAGE' ? (
                          <div className="w-full h-full flex items-center text-center text-red-600">
                            {discountValue && (
                              <span className="text-4xl font-medium flex-1">
                                {(100 - discountValue) / 10}
                                <span className="text-sm">???</span>
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center text-center text-red-600">
                            {discountValue && (
                              <span
                                className={`${
                                  discountValue.toString().length <= 3
                                    ? 'text-4xl'
                                    : discountValue.toString().length < 5
                                    ? 'text-2xl'
                                    : 'text-xl'
                                } font-medium flex-1`}
                              >
                                <span className="text-sm">???</span>
                                {discountValue}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    <span className="text-red-600" style={{ fontSize: '12px', lineHeight: '1.1' }}>
                      {voucherName}
                    </span>
                  </div>
                </div>
                <div className="w-full h-28 py-3 px-4 relative">
                  <div
                    style={{ fontSize: '12px' }}
                    className="text-gray-400 w-full h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-red-600">{Description}</div>
                      <div>????????????</div>
                      <div>{startTimes + '-' + endtTimes}</div>
                    </div>
                    <div className="absolute bottom-2 right-6 py-1 bg-red-600 rounded w-16 text-center text-white flex items-center justify-center">
                      ????????????
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">{intl.get('voucher.Note: One consumer can only use once.')}</div>
          </div>
        )
      }}
    </Form.Item>
  )
}

export default Finishedproductdisplay
