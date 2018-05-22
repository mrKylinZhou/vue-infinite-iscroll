<template>
  <div>
    <scroll-wrap
      :lists="lists"
      @update="handleUpdate">
      <div
        class="row"
        v-for="(item, index) in showLists"
        :key="index"
        :data-id="item">
        {{ item }}
      </div>
    </scroll-wrap>
  </div>
</template>

<script>
import ScrollWrap from './Wrap'
export default {
  data() {
    const lists = new Array(2000).fill('t').map((item, i) => item + i)
    const checkboxs = Object.create(null)
    lists.forEach(item => {
      checkboxs[item] = true
    })
    return {
      lists,
      showLists: lists.slice(0, 30),
      checkboxs
    }
  },
  components: {
    ScrollWrap
  },
  methods: {
    handleUpdate(oldVal, value) {
      if (oldVal === value) return
      const keyIndex = this.showLists.findIndex(item => item === oldVal)
      if (!~keyIndex) return
      this.showLists.splice(keyIndex, 1, value)
      this.$nextTick(() => {
        this.$forceUpdate()
      })
    }
  }
}
</script>
