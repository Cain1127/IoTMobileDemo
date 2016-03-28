#iaccenturer_subapp
# [Yeoman](http://yeoman.io) 生成的 [Ionic](http://www.ionicframework.com/) 输入iaccenturer的子项目项目


### 功能列表

* 利用GULP任务实现开发环境，生成环境分离
* 支持SASS编译和合拼
* 本地调试即时生效（livereload）
* 自定符号在编译时自动解释（index.html）
* 自动压缩所有资源（css，js，html）
* 自动包含 [Ionic](http://www.ionicframework.com) 基础样式库
* 自动包含 [ng-cordova](http://ngcordova.com/) 和 [lodash](https://lodash.com) 插件
* 自动读取svg文件，生成 icon font


### 环境准备
```bash
【前置】你需要在本机安装ruby，nodejs，npm，sass（gem）
```

安装必要组件Ionic,Cordova,Bower,Gulp

```bash
npm install -g ionic cordova bower gulp
```
也可以通过NodeJS自检安装器，安装本项目所有依赖组件（依赖组件在package.json有注明，公司网络有可能出现安装失败）
```bash
npm install
```

### 运行项目
默认情况下项目被设定为开发环境，通过gulp命令运行项目
```bash
gulp
```
### 生成和编辑APP
gulp会自动压缩所有资源，删除无用代码，跑验证等等最后会输出到WWW目录下，然后调用ionic的build命令
```bash
gulp --build
```
### 模拟器上运行
`gulp -r <platform>` (先执行上面的build命令)
### 目录结构
- `app` 是源码目录
- `data` 是通过mockjs生成的模拟后端数据
- `resources` 是app的icon
- `.app` 是开发输出目录（每次改动源码目录内的内容都会重新编译输出）
- `www` 是生产环境下的目录（所有资源都被压缩，代码无法跟踪）

###代码管理
master分株主要来更新公共的资源和工作流程 所有其他的app另开分支

## 使用协议

[MIT](http://baike.baidu.com/subview/74918/8382747.htm) License
