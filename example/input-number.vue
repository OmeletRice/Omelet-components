<template>
  <div>
    <h2>Input</h2>
    <div class="porp-style-select">
      <div class="porp-style-selete-item">
        <span>size:</span>
        <label v-for="s in sizes" :key="s">
          <input type="radio" name="size" :value="s" @click.stop="handle(s, 'size')"> {{ s }}
        </label>
      </div>
      <div class="porp-style-selete-item">
        <span>disabled:</span>
        <label v-for="s in disableds" :key="s">
          <input type="radio" name="disabled" :value="s" @click.stop="handle(s, 'disabled')"> {{ s }}
        </label>
      </div>
      <div class="porp-style-selete-item">
        <span>controls:</span>
        <label v-for="s in controlss" :key="s">
          <input type="radio" name="controls" :value="s" @click.stop="handle(s, 'controls')"> {{ s }}
        </label>
      </div>
      <div class="porp-style-selete-item">
        <span>controlPosition:</span>
        <label v-for="s in controlPositions" :key="s">
          <input type="radio" name="controlPosition" :value="s" @click.stop="handle(s, 'controlPosition')"> {{ s }}
        </label>
      </div>
    </div>
    <div class="prop-style-preview">
      <h4>min="-10" max="10" step="2"</h4>
      <om-input-number 
        v-model="value"
        :min="-10"
        :max="10"
        :step="2"
        :size="size"
        :disabled="disabled"
        :controls="controls"
        :control-position="controlPosition">
      </om-input-number>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 2,
      sizes: ['normal', 'medium', 'small', 'mini'],
      size: '',
      disableds: [true, false],
      disabled: false,
      controlss: [true, false],
      controls: true,
      controlPositions: ['right', 'left', 'none'],
      controlPosition: ''
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
