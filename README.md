# vue-infinite-iscroll

> 一个基于[iscroll](https://github.com/cubiq/iscroll)封装的vue无限滚动组件

目前已经有很多vue组件支持下拉加载和上拉刷新等功能了，但这在用户体验上其实是不得已而为之的事情。

下拉加载过程中，每次下拉都会新增一部分dom到html中，当用户一直下拉加载的时候，页面很容易就会卡死。

iscroll 是一个非常好的JS滚动库，其中实现了无限滚动（滚动过程中不断进行Dom替换）

但是其并没有提供一个vue可直接使用的组件，这个组件就做了这个事情。

## Install
```shell
npm install vue-infinite-iscroll -S || yarn add vue-infinite-iscroll
```

## Links

- [issues](https://github.com/mrKylinZhou/vue-infinite-iscroll/issues)
- [docs](./docs/scroll.md)
- [log](./change-log.md)

## Quick Start
```html
<infinite-scroll
  :lists="lists"
  :length="30">
  <div
    slot-scope="props">
    {{ props.data }}
  </div>
</infinite-scroll>
```

## 谁在使用

[Bfui](https://www.npmjs.com/package/bfui)

[无限滚动下拉框](http://10.4.230.22:8090/#/zh-CN/component/infinite-select)

## LICENSE
MIT
