<template>
  <div id="wrapper">
    <div id="scroller">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-infinite'
export default {
  props: {
    lists: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      scroll: null,
    }
  },
  watch: {
    lists() {
      this.scroll & this.scroll.destroy()
      this.scroll = null
      this.$nextTick(() => {
        this.$init()
      })
    }
  },
  methods: {
    $init() {
      this.scroll = new IScroll('#wrapper', {
        mouseWheel: true,
        infiniteElements: '#scroller .row',
        dataset: this.requestData,
        dataFiller: this.updateContent,
        infiniteLimit: this.lists.length,
        cacheSize: 1000
      });
    },
    requestData(start, count) {
      this.$nextTick(() => {
        this.scroll && this.scroll.updateCache(start, this.lists.slice(start, start + count))
      })
    },
    updateContent(el, value) {
      const oldVal= el.getAttribute('data-id')
      this.$emit('update', oldVal, value)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$init()
    })
  }
}
</script>

<style>
  #wrapper {
    position: relative;
    height: 300px;
    z-index: 1;
    overflow: hidden;
  }

  #scroller {
    position: absolute;
    z-index: 1;
    width: 100%;
    transform: translateZ(0);
    user-select: none;
  }

  #scroller {
    padding: 0;
    margin: 0;
    position: relative;
  }

  #scroller .row {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateZ(0);
  }
</style>
