<template>
  <div>
    <h2>Dropdown</h2>
    <h3>Prop: trigger type size splitButton hideOnClick placement visibleArrow showTimeout hideTimeout</h3>
    <h3>Event: visible-change click</h3>
    <div class="porp-style-select">
      <div class="porp-style-selete-item">
        <span>trigger:</span>
        <label v-for="s in triggers" :key="s">
          <span> {{ s }} </span>
        </label>
      </div>
      <div class="porp-style-selete-item">
        <span>splitButton:</span>
        <label v-for="s in splitButtons" :key="s">
          <span> {{ s }} </span>
        </label>
      </div>
      <div class="porp-style-selete-item">
        <span>placement: </span>
        <span>  top / top-start / top-end / bottom / bottom-start / bottom-end </span>
      </div>
    </div>
    <div class="prop-style-preview">
      <om-dropdown 
        :trigger="trigger" 
        :split-button="splitButton" 
        type="primary">
        <span>下拉菜单下拉菜单</span>
        <om-dropdown-menu slot="dropdown">
          <om-dropdown-item>1</om-dropdown-item>
          <om-dropdown-item>2</om-dropdown-item>
          <om-dropdown-item>3</om-dropdown-item>
          <om-dropdown-item>4</om-dropdown-item>
          <om-dropdown-item>5</om-dropdown-item>
        </om-dropdown-menu>
      </om-dropdown>
    </div>

    <h2>DropdownItem</h2>
    <h3>Prop: divided disabled command</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      triggers: [ 'hover', 'click'],
      trigger: 'hover',
      splitButtons: [true, false],
      splitButton: false
    }
  },

  methods: {
    handle(s, t) {
      this[t] = s
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
