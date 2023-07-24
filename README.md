# Fitness2023
Front-end part of fitness app based on Harmony OS.

## 说明
本项目是基于Huawei Watch 3开发的运动健康APP前端部分，是基于Harmony OS开发的。实际开发时，本项目仅作为参考。

## 环境
开发工具：DevEco v3.0 <br>
开发语言：JavaScript、CSS

## 结构
```
└─entry/src/main
    ├─js/default
        ├─common/images    // 静态资源，主要是放一些图片
        ├─i18n             // 配置中英文，不需要动
        ├─pages            // 页面编写
        ├─app.js           // 应用启动入口，默认是启动和销毁两个函数，本项目在data中添加了后台服务的url
    ├─config.json          // 应用全局配置，比较重要的包括路由信息、权限设置等
```

## 启动、调试、部署
参考本仓库的那个pdf

## 配套后端项目
https://github.com/AlanFranklin258/Fitness2023-Api
