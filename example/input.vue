<template>
  <div>
    <h2>Input</h2>
    <h3>Props: size disabled autoComplete label value name maxlength minlength readonly autofocus size disabled form id</h3>
    <h3>Slots: prepend [ prefix prefixIcon ] [ suffix suffixIcon ] append</h3>
    <div class="porp-style-select">
      <div class="porp-style-selete-item">

      </div>
    </div>
    <div class="prop-style-preview">
      <h4>prepend & append</h4>
      <om-input :value="value">
        <div slot="prepend">Http://</div>
        <div slot="append">.com</div>
      </om-input>
      <h4>prefixIcon = 'om-icon-search'</h4>
      <om-input :prefix-icon="'om-icon-search'"></om-input>
      <h4>suffixIcon = 'om-icon-search'</h4>
      <om-input :suffix-icon="'om-icon-search'"></om-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 'laksks'
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
