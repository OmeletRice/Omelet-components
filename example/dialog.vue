<template>
  <div>
    <h2>Dialog</h2>
    <h3>Prop: title modal modalAppendToBody lockScroll closeOnClickModal closeOnPressEscape showClose size customClass top beforeClose</h3>
    <h3>modal层样式引入问题</h3>
    <div class="porp-style-select">
      <div class="porp-style-selete-item">
        <button @click="handleShowDialog">show</button>
      </div>
    </div>
    <div class="prop-style-preview">
      <om-dialog :title="'Title'" :visible="isShow">This is Dialog Content</om-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    }
  },

  methods: {
    handle(s, t) {
      this[t] = s
    },
    handleShowDialog() {
      this.isShow = true
    }
  }
}
</script>

<style>
.porp-style-select,
.prop-style-preview {
  width: 40%;
  display: inline-block;
  border: 1px solid black;
  padding: 10px 5px;
  vertical-align: top
}

.porp-style-select {
  text-align: left
}
</style>
