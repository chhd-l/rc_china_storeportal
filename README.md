# rc_china_storeportal

## 开发环境

- [download](https://nodejs.org/en/download/) - node<sup>^8.10.0</sup> npm<sup>^5.6.0</sup>

### 安装依赖

```shell
//到达你的项目目录
cd project

//安装依赖
npm install

```

### 运行

```shell
//启动
npm start

```

### 项目结构说明

```
project
├── config                   //  构建等配置
├── public                   // public资源
│   └── favicon.png          // Favicon
├── src
│   ├── assets               // 本地静态资源
│   ├── components           // 业务通用组件
│   ├── hooks                // 通用逻辑复用
│   ├── layout               // 布局
│   ├── views                // 业务页面入口
│   ├── routers               // 路由配置文件
│   ├── utils                // 工具库
│   ├── typings              // 全局类型
│   ├── App.js               // 组件入口
│   └── index.js             // entry JS
├── README.md
└── package.json
└── tsconfig.json            // 常规配置
└── .templates               //代码模板  (需要安装[vscode](https://marketplace.visualstudio.com/items?itemName=yongwoo.template)插件)
└── template.config.js   //生成模板代码配置文件



```

### 开发约定

- page 页面代码结构约定

  ```
  └── pages
    ├── Home
    |   ├── components // 放置本页面拆分的一些组件
    |   ├── hooks      // 放置本页面拆分的一些可复用逻辑
    |   ├── index.tsx  // 页面组件的代码
    |   └── index.less // 页面样式
  
  ```
- 命名约定
  - 文件夹,脚本：小写
  - 组件：大驼峰  // 包括components和page 下面的components
  - interface：xxProps
  - 接口:
    ```
      api query-product
      function get-product.ts
      getProduct = () =>{queryProduct}
    ```
- 组件使用约定
  
  - 优先使用components下的组件进行开发
  - 组件文件夹分类: common / 业务组件
  
- router 约定
  
  - 应用通过 `/routers/index.tsx` 统一管理。
  
- 项目健壮性约定

  - 子路由 components 通过 `React.lazy` 做处理动态引入组件。

- 目录约定

  - 应用逻辑开发的公共资源在 `project/src/public` 下，而非 `project/public` 下。
  - 公共 components 开发目录在 `project/src/components`。


标准例子：

```
git commit -m 'upd: 增加 xxx 功能'
git commit -m 'feat: 修复 xxx 功能'
```

#### 常用的 type 类别

- upd：更新某功能（不是 feat, 不是 fix）
- feat：新功能（feature）
- fix：修补 bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动


### 库和版本（基于 create-react-app 和 Ant Design）

```
{
    "@testing-library/jest-dom": "^5.11.4",         // test library, included in create-react-app by default
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "ahooks": "^2.10.2",                            // Functional hooks, use for business logics or user interaction
    "antd": "^4.15.3",                              // UI components and style, include uploading library etc.
    "axios": "^0.21.1",                             // Request tools
    "bizcharts": "^4.1.10",                         // Charts library
    "craco-less": "^1.17.1",                        // Less supported
    "moment": "^2.29.1",                            // Date Time format
    "react": "^17.0.2",                             // React core
    "react-dnd": "^14.0.2",                         // Drag and sort core
    "react-dnd-html5-backend": "^14.0.0",           // H5 drag library
    "react-dom": "^17.0.2",                         // React for web
    "react-intl-universal": "^2.4.5",               // Internationalization
    "react-router-dom": "^5.2.0",                   // React router
    "react-scripts": "4.0.3",                       // Build scripts and build env supported
    "web-vitals": "^1.0.1"                          // Web performance analysis, included in create-react-app by default
}
```

### 注意事项 TODO

### 相关文档

- [create-react-app](https://github.com/facebook/create-react-app)
- [react](https://reactjs.org/)
- [antd](https://ant.design/index-cn)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [react-router-config](https://www.npmjs.com/package/react-router-config)
- [axios](https://www.npmjs.com/package/axios)
- [bizcharts](https://bizcharts.net/product/BizCharts4/category/61/page/98)
- [ahooks](https://ahooks.js.org/zh-CN/)

配置相关

- [webpack](https://www.webpackjs.com/)
