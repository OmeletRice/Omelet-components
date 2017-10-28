<template>
  <div>
    <h2>Input</h2>
    <div class="porp-style-select">
      <div class="porp-style-selete-item">

      </div>
    </div>
    <div class="prop-style-preview">
      <om-input>
        <template slot="prepend">Http://</template>
      </om-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
