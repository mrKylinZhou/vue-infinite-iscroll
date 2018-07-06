## Scroll

### 简单的例子

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

### 属性
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| lists | 完整的列表 | array | — | — |
| height | 最大高度| number | — | 300 |
| wrapCustomClass | 自定义wrap类名 | string | — | - |
| rowCustomClass | 自定义item类名 | string | — | - |
