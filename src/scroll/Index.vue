<template>
  <div
    ref="wrapper"
    class="wrapper">
    <div class="scroller">
      <div
        ref="row"
        class="row"
        v-for="(item, index) in showLists"
        :key="index"
        :data-id="item">
        <slot :data="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-infinite'
export default {
  props: {
    lists: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      showLists: this.lists.slice(0, 30)
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
      this.scroll = new IScroll(this.$refs.wrapper, {
        mouseWheel: true,
        infiniteElements: this.$refs.row,
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
    this.$nextTick(() => {
      this.$init()
    })
  }
}
</script>

<style scoped>
  .wrapper {
    position: relative;
    max-height: 300px;
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
