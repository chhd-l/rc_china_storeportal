import { LabelOptionProps, PageParamsProps } from "@/framework/types/common"
import { Modal } from "antd"
import { ModalFuncProps } from "antd/es/modal"
import { ReactNode } from "react"
import moment from 'moment'

export const getCurrencyCode = () => {
  return "￥"
}

export const formatMoney = (price: number) => {
  return getCurrencyCode() + (price || 0).toFixed(2)
}

export const handleValueEnum = (list: LabelOptionProps[]) => {
  let newEnum: { [x: string]: ReactNode } = {}
  list.forEach((item: LabelOptionProps) => {
    newEnum[item.value] = { text: item.label }
  })
  console.log(newEnum)
  return newEnum
}

/**
 * 处理分页组件数据，达到前端分页的目的
 * @param pageParams
 */
export const handlePageParams = (pageParams: PageParamsProps) => {
  const { currentPage, pageSize } = pageParams
  return {
    offset: currentPage * pageSize - pageSize,
    limit: pageSize,
  }
}

export const handleReturnTime = (time: any, showTime: boolean = true) => {
  if (time !== null && time !== undefined && time !== '') {
    return moment(new Date(time)).format(showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')
  } else {
    return ''
  }
}

export const handleObjDataForEdit = (before: any, after: any, diffObj: any) => {
  let keysOne = Object.keys(before) // 获取对象1所有键数组
  for (let key of keysOne) {
    if (typeof before[key] === 'object' && before[key] !== null) {  // 如果是对象，则再递归对比，如果递归返回false，则直接方法也直接返回false
      if (Object.prototype.toString.call(before[key]) === '[object Object]') {
        handleObjDataForEdit(before[key], after[key], diffObj)
        // if (!handleObjDataForEdit(before[key], after[key])) return false
      }
      if (Object.prototype.toString.call(before[key]) === '[object Array]') {
        //数组的情况
        // handleArrDataForEdit(before[key], after[key], diffObj, key)
      }
    } else if (typeof before[key] === 'function' || typeof before[key] === 'symbol') { // 如果是function或symbol，转字符串再对比，不匹配则直接返回false
      if (String(before[key]) !== String(after[key])) return false
    } else {  // 最后其他类型用es6得Object.is()来比较，不匹配直接返回false
      if (before[key] !== after[key]) {

        diffObj[key] = after[key]
      }
      // if (!Object.is(before[key], after[key])) return false
    }
  }
  return diffObj  // 遍历结束了没有返回false，说明没有问题，这里直接返回true，表示键值全等了
}

export const handleArrDataForEdit = (before: any, after: any, diffObj: any, keyName: string) => {
  // todo
  if (!after) {
    return
  }
  if (keyName === 'goodsSpecifications') {
    // debugger
  }
  if (!diffObj[keyName]) {
    diffObj[keyName] = []
  }
  //取到补集
  let complement = after.filter((beforeItem: any) => {
    return before.findIndex((afterItem: any) => beforeItem.id === afterItem.id) === -1
  })
  //取到交集
  let union = before.filter((beforeItem: any) => {
    return after.findIndex((afterItem: any) => beforeItem.id === afterItem.id) !== -1
  })
  //判断有没有删除
  let deleted = complement.filter((item: any) => item.id).map((item: any) => {
    let newItem = {
      isDelete: true,
      id: item.id
    }
    return newItem
  })


  //判断有没有新增
  let added = complement.filter((item: any) => !item.id)
  if (deleted?.length || added?.length) {
    // debugger
    let datas = [...deleted, ...added]
    diffObj[keyName].push(datas)
    // if (diffObj[keyName]) {
    //   diffObj[keyName].push(datas)
    // } else {
    //   diffObj[keyName] = []
    //   diffObj[keyName].push(datas)
    // }
  }
  // 判断有没有修改 //修改这个有点麻烦
  union.forEach((unionItem: any) => {
    after.find((item: any) => {
      if (unionItem.id === item.id) {
        handleObjDataForEdit(unionItem, item, diffObj[keyName])
      }
    })
  })
}

export const uuid = () => {
  return 'xxxx-xxxx-4xxx-yxxx-xxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0;
    let v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  })
}


// 获取cookie
export const getCookie = (key: string) => {
  if (document.cookie.length > 0) {
    var start = document.cookie.indexOf(key + '=')
    if (start !== -1) {
      start = start + key.length + 1
      var end = document.cookie.indexOf(';', start)
      if (end === -1) end = document.cookie.length
      return unescape(document.cookie.substring(start, end))
    }
  }
  return ''
}
// 保存cookie
export const setCookie = (cName: string, value: string, expiredays: number) => {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  // @ts-ignore
  document.cookie = cName + '=' + decodeURIComponent(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}

export const getAge = (birthdayStr: any) => {
  if (!birthdayStr) {
    return ''
  }
  let birthday = birthdayStr.split('-')
  // 新建日期对象
  let date = new Date()
  // 今天日期，数组，同 birthday
  let today = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
  // 分别计算年月日差值
  let age = today.map((value, index) => {
    return value - birthday[index]
  })
  if (age[0] > 0) {
    return age[0] * 12
  } else if (age[1] > 0) {
    return age[1]
  } else {
    return 1
  }
}

/**
 * 调用antd的Modal.confirm统一弹出确认框样式
 */
export const openConfirmModal: (config: ModalFuncProps) => void = (config) => {
  Modal.confirm({
    className: "rc-modal",
    okText: "Confirm",
    cancelText: "Cancel",
    closable: true,
    icon: null,
    title: config.title || "Confirm",
    content: config.content || "Are you sure you want to take this action?",
    onOk: config.onOk,
  });
}
