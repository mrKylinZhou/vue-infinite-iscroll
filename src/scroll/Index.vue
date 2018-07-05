<template>
  <div
    ref="wrapper"
    :class="wrapperClass"
    :style="{
      height: `${height}px`
    }">
    <div :class="{ 'k-infinite-iscroll-scroller' : useIscroll }">
      <div
        ref="row"
        :class="rowClass"
        v-for="(item, index) in showLists"
        :key="index"
        :data-id="item">
        <slot :data="JSON.parse(item)"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-infinite'
import ElementResize from 'element-resize-detector'

import { throttle } from 'lodash/function'

export default {
  props: {
    // 完整的展示列表
    lists: {
      required: true,
      type: Array
    },
    // 需要复用的元素个数
    length: {
      type: Number,
      default: 30
    },
    // 视觉区域高度
    height: {
      type: Number,
      default: 300
    },
    wrapCustomClass: String,
    rowCustomClass: String
  },
  data() {
    return {
      showLists: this.lists
        .slice(0, this.length)
        .map(item => JSON.stringify(item)),
      useIscroll: false,
      erd: null
    }
  },
  computed: {
    wrapperClass() {
      const base = 'k-infinite-iscroll-wrapper'
      const classes = [this.wrapCustomClass]
      if (this.useIscroll) classes.push(base)
      return classes
    },
    rowClass() {
      const base = 'k-infinite-iscroll-row'
      return [this.rowCustomClass, base]
    }
  },
  watch: {
    lists() {
      this.scroll && this.scroll.destroy()
      this.scroll = null
      this.$nextTick(() => {
        this.$init()
      })
    }
  },
  methods: {
    calc() {
      const baseRowHeight = this.$refs.row
        ? this.$refs.row[0].offsetHeight
        : 0
      const wrapperHeight = this.height
      this.useIscroll = wrapperHeight < baseRowHeight * this.showLists.length
        ? true
        : false
      this.$nextTick(() => {
        this.scroll && this.scroll.destroy()
        this.scroll = null
        this.useIscroll && this.$init()
      })
    },
    $init() {
      const wrapper = this.$refs.wrapper
      if (!wrapper
        || !wrapper.parentNode
        || wrapper.parentNode.style.display === 'none')
      return
      this.scroll = new IScroll(wrapper, {
        mouseWheel: true,
        infiniteElements: this.$refs.row,
        dataset: this.requestData,
        dataFiller: this.updateContent,
        infiniteLimit: this.lists.length,
        cacheSize: Math.max(300, this.length)
      })
    },
    requestData(start, count) {
      this.$nextTick(() => {
        const caches = this.lists
          .slice(start, start + count)
          .map(item => JSON.stringify(item))
        this.scroll && this.scroll.updateCache(start, caches)
      })
    },
    updateContent(el, value) {
      const oldVal= el.getAttribute('data-id')
      this.handleUpdate(oldVal, value)
    },
    handleUpdate(oldVal, value) {
      if (oldVal === value) return
      const keyIndex = this.showLists.findIndex(item => item === oldVal)
      if (!~keyIndex) return
      this.showLists.splice(keyIndex, 1, value)
      this.$nextTick(() => {
        this.$forceUpdate()
      })
    }
  },
  mounted() {
    this.calc()
    this.erd = new ElementResize()
    this.calc = throttle(this.calc.bind(this), 300)
    this.erd.listenTo(this.$refs.wrapper, this.calc.bind(this))
  },
  beforeDestroy() {
    this.erd && this.$refs.wrapper && this.erd.uninstall(this.$refs.wrapper)
    this.erd = null;
  }
}
</script>

<style scoped>
  .k-infinite-iscroll-wrapper {
    position: relative;
    z-index: 1;
    overflow: hidden;
  }

  .k-infinite-iscroll-scroller {
    position: absolute;
    z-index: 1;
    width: 100%;
    transform: translateZ(0);
    user-select: none;
  }

  .k-infinite-iscroll-scroller {
    padding: 0;
    margin: 0;
    position: relative;
  }

  .k-infinite-iscroll-scroller .k-infinite-iscroll-row {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateZ(0);
  }
</style>
