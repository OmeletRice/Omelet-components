<template>
    <div>
    <h2>Color-Picker</h2>
    <h3>Prop: value showAlpha colorList size</h3>
    <div class="porp-style-select">
      <div class="porp-style-selete-item">
        <span>value: {{ value }}</span>
      </div>
      <div class="porp-style-selete-item">
        <span>change: {{ changeColor }}</span>
      </div>
      <div class="porp-style-selete-item">
        <span>changed: {{ changedColor }}</span>
      </div>
      <div class="porp-style-selete-item">
        <span>enter: {{ enterColor }}</span>
      </div>
      <div class="porp-style-selete-item">
        <span>leave: {{ leaveColor }}</span>
      </div>
    </div>
    <div class="prop-style-preview">
      <om-color-picker :value="value" :show-alpha="false" 
      @change="handleChange" 
      @changed="handleChanged" 
      @enter="handleEnter" 
      @leave="handleLeave" ></om-color-picker>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '#FFFFFF',
      changeColor: '',
      changedColor: '',
      enterColor: '',
      leaveColor: ''
    }
  },

  methods: {
    handleChange(val) {
      this.changeColor = val
    },
    handleChanged(val) {
      this.changedColor = val
    },
    handleEnter(val) {
      this.enterColor = val
    },
    handleLeave(val) {
      this.leaveColor = val
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
