import { template } from 'lodash'
import { message } from 'antd'
export const mockList = {
  "list|9": [
    {
      channel: "@name",
      scenario: "@name",
      id: "@id",
      path: "@url",
      status: "@boolean",
      title: "@name",
    },
  ],
}
export const messageList = {
  'list|11': [{
    id: "@id",
    accountId: "@name",
    scenario: "@name",//用于场景
    templateId: "@ic",
    url: "@url",// # 用户跳转路径
    appId: "@id",//# 小程序id
    pagePath: "@url",//# 小程序跳转路径
    status: "@boolean",
    title: "@name",
    primaryIndustry: "@name",// # 一级行业
    deputyIndustry: "@name",//  # 二级行业
    content: "@name",// # 模板内容
    example: "@name"//  # 例子
  }]
}
export const templateContent = {
  'list|5': [{ keyword: '@name', keywordDefault: '@name', display: "@color" }]
}