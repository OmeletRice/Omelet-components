<template>
  <div>
    <h2>Radio</h2>
    <h3>Props: type size icon nativeType loading disabled plain autofocus customClass</h3>
    <div class="porp-style-select">
      <div class="porp-style-selete-item">
        <span>disabled:</span>
        <label v-for="s in disableds" :key="s">
          <input type="radio" name="disabled" :value="s" @click.stop="handle(s, 'disabled')"> {{ s }}
        </label>
      </div>
    </div>
    <div class="prop-style-preview">
      <om-radio 
        v-model="value"
        :label="1"
        :disabled="disabled">
          index1
      </om-radio>
      <om-radio 
        v-model="value"
        :label="2"
        :disabled="disabled">
          index2
      </om-radio>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 2,
      disableds: [true, false],
      disabled: false
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
