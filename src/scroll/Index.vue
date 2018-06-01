<template>
  <div
    ref="wrapper"
    :class="{ wrapper: useIscroll }"
    :style="{
      height: `${height}px`
    }">
    <div :class="{ scroller : useIscroll }">
      <div
        ref="row"
        class="row"
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
    }
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
      const wrapperHeight = this.$refs.wrapper.offsetHeight
      this.useIscroll = wrapperHeight < baseRowHeight * this.showLists.length
        ? true
        : false
    },
    $init() {
      this.scroll = new IScroll(this.$refs.wrapper, {
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
    this.erd.listenTo(this.$refs.wrapper, this.calc.bind(this))
    this.$nextTick(() => {
      this.useIscroll && this.$init()
    })
  },
  beforeDestroy() {
    this.erd && this.$refs.wrapper && this.erd.uninstall(this.$refs.wrapper);
    this.erd = null;
  }
}
</script>

<style scoped>
  .wrapper {
    position: relative;
    z-index: 1;
    overflow: hidden;
  }

  .scroller {
    position: absolute;
    z-index: 1;
    width: 100%;
    transform: translateZ(0);
    user-select: none;
  }

  .scroller {
    padding: 0;
    margin: 0;
    position: relative;
  }

  .scroller .row {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateZ(0);
  }
</style>
