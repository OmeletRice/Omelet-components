<template>
  <div>
    <h2>Dialog</h2>
    <h3>Prop: title modal modalAppendToBody lockScroll closeOnClickModal closeOnPressEscape showClose size customClass top beforeClose</h3>
    <h3>modal层样式引入问题</h3>
    <div class="porp-style-select">
      <div class="porp-style-selete-item">
        <button @click="handleShowDialog(1)">show1</button>
      </div>
    </div>
    <div class="prop-style-preview">
      <om-dialog 
        v-model="isShow1"
        :title="'Title'" 
        :modal="true"
        :modal-append-to-body="true">
          This is Dialog Content
        <button @click="handleShowDialog(2)">show2</button>
        <om-dialog 
          v-model="isShow2"
          :title="'Title'" 
          :modal="true"
          :modal-append-to-body="false">
          This is Content</om-dialog>
      </om-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow1: false,
      isShow2: false
    }
  },

  methods: {
    handle(s, t) {
      this[t] = s
    },
    handleShowDialog(val) {
      if (val === 1) {
        this.isShow1 = true
      } else if (val === 2) {
        this.isShow2 = true
      }
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
