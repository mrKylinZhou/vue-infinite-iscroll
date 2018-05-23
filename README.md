# vue-infinite-iscroll

> 一个基于[iscroll](https://github.com/cubiq/iscroll)封装的vue无限滚动组件

目前还没有专门的单元测试以及详细的使用报告与使用范围。仅仅是一个例子供个人娱乐，不建议使用到开发的项目中

## Install
```shell
npm install vue-infinite-iscroll -S || yarn add vue-infinite-iscroll
```

## Links

- [issues](https://github.com/mrKylinZhou/vue-infinite-iscroll/issues)
- [docs](./docs/scroll.md)

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

## LICENSE
MIT
