<template>
  <div>
    <h2>Radio</h2>
    <h3>Props: label value disabled name customClass</h3>
    <div class="porp-style-select">
      <div class="porp-style-selete-item">
        <span>disabled:</span>
        <label v-for="s in disableds" :key="s">
          <input type="radio" name="disabled" :value="s" @click.stop="handle(s, 'disabled')"> {{ s }}
        </label>
      </div>
    </div>
    <div class="prop-style-preview">
      <om-radio v-model="value" :label="1" :disabled="disabled">index1</om-radio>
      <om-radio v-model="value" :label="2" :disabled="disabled">index2</om-radio>
      <om-radio v-model="value" :label="3" :disabled="disabled">index3</om-radio>
    </div>
    <!--  -->
    <h2>Radio-Group</h2>
    <h3>Props: size disabled customClass</h3>
    <div class="porp-style-select">
      <div class="porp-style-selete-item">
        <span>disabled:</span>
        <label v-for="s in disableds" :key="s">
          <input type="radio" name="disabled" :value="s" @click.stop="handle(s, 'disabled1')"> {{ s }}
        </label>
      </div>
      <div class="porp-style-selete-item">
        <span>vertical:</span>
        <label v-for="s in verticals" :key="s">
          <input type="radio" name="vertical" :value="s" @click.stop="handle(s, 'vertical')"> {{ s }}
        </label>
      </div>
    </div>
    <div class="prop-style-preview">
      <om-radio-group v-model="value" :disabled="disabled1" :vertical="vertical">
        <om-radio :label="1">index1</om-radio>
        <om-radio :label="2">index2</om-radio>
        <om-radio :label="3">index3</om-radio>
      </om-radio-group>
    </div>
    <!--  -->
    <h2>Radio-Button</h2>
    <h3>Props: disabled vertical customClass</h3>
    <div class="porp-style-select">
      <div class="porp-style-selete-item">
        <span>disabled:</span>
        <label v-for="s in disableds" :key="s">
          <input type="radio" name="disabled" :value="s" @click.stop="handle(s, 'disabled2')"> {{ s }}
        </label>
      </div>
      <div class="porp-style-selete-item">
        <span>size:</span>
        <label v-for="s in sizes" :key="s">
          <input type="radio" name="size" :value="s" @click.stop="handle(s, 'size')"> {{ s }}
        </label>
      </div>
    </div>
    <div class="prop-style-preview">
      <om-radio-group v-model="value" :disabled="disabled2" :size="size">
        <om-radio-button :label="1">index1</om-radio-button>
        <om-radio-button :label="2">index2</om-radio-button>
        <om-radio-button :label="3">index3</om-radio-button>
      </om-radio-group>
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
      verticals: [true, false],
      vertical: false,
      disableds: [true, false],
      disabled: false,
      disabled1: false,
      disabled2: false
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
