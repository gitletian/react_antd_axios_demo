1、参考:
    https://www.jianshu.com/p/65ab0b80c83e    react antd axios
    https://www.jianshu.com/p/dbf6dda29401    router redux

第一节：
2、创建项目
    npm install -g create-react-app
    create-react-app react_antd_axios_demo

3、目录结构
    public： index.html文件， id=root的div，这是我们应用组件的根节点
    src： 存放css与js
        index.js： 整个工程的入口

4、antd 安装
    npm install babel-plugin-import --save-dev
    npm install antd --save
    在ie11下，会报不支持startsWith的错
        需要安装npm install --save babel-polyfill
        然后在入口文件index.js中引入import 'babel-polyfill';


5、安装 axios
    npm install axios --save

6、安装 mockjs 模拟数据
    1、npm install mockjs --save-dev
    2、安装 json-server
        npm install -g json-server
        json-server --watch --port 53000 ./mock/app.js



第二节：

1、react-router 配置
    npm install react-router-dom --save

2、安装 redux
    npm install --save redux
