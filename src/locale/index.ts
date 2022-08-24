import antd_en_us from 'antd/lib/locale/en_US'
import antd_zh_cn from 'antd/lib/locale/zh_CN'

import loca_en_us from './files/en_US'
import loca_zh_cn from './files/zh_CN'

export type TLangKey = 'en_US' | 'zh_CN';

export default {
  antd: {
    'en_US': antd_en_us,
    'zh_CN': antd_zh_cn,
  },
  loca: {
    'en_US': loca_en_us,
    'zh_CN': loca_zh_cn,
  }
}
