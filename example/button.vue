<template>
  <div>
    <h2>Button</h2>
    <h3>Props: type size icon nativeType loading disabled plain autofocus customClass</h3>
    <div class="porp-style-select">
      <div class="porp-style-selete-item">
        <span>type:</span>
        <label v-for="s in types" :key="s">
          <input type="radio" name="type" :value="s" @click.stop="handle(s, 'type')"> {{ s }}
        </label>
      </div>
      <div class="porp-style-selete-item">
        <span>size:</span>
        <label v-for="s in sizes" :key="s">
          <input type="radio" name="size" :value="s" @click.stop="handle(s, 'size')"> {{ s }}
        </label>
      </div>
      <div class="porp-style-selete-item">
        <span>nativeType:</span>
        <label v-for="s in nativeTypes" :key="s">
          <input type="radio" name="nativeType" :value="s" @click.stop="handle(s, 'nativeType')"> {{ s }}
        </label>
      </div>
      <div class="porp-style-selete-item">
        <span>disabled:</span>
        <label v-for="s in disableds" :key="s">
          <input type="radio" name="disabled" :value="s" @click.stop="handle(s, 'disabled')"> {{ s }}
        </label>
      </div>
      <div class="porp-style-selete-item">
        <span>plain:</span>
        <label v-for="s in plains" :key="s">
          <input type="radio" name="plain" :value="s" @click.stop="handle(s, 'plain')"> {{ s }}
        </label>
      </div>
    </div>
    <div class="prop-style-preview">
      <om-button :type="type" :size="size" :native-type="nativeType" :disabled="disabled" :plain="plain">index</om-button>
    </div>
    <h2>Button-Group</h2>
    <h3>Props: customClass</h3>
    <div class="prop-style-preview">
      <om-button-group>
        <om-button :type="type" :size="size" :native-type="nativeType" :disabled="disabled" :plain="plain">index-1</om-button>
        <om-button :type="type" :size="size" :native-type="nativeType" :disabled="disabled" :plain="plain">index-2</om-button>      
        <om-button :type="type" :size="size" :native-type="nativeType" :disabled="disabled" :plain="plain">index-3</om-button>      
      </om-button-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      types: ['none', 'primary', 'success', 'warning', 'danger', 'info', 'text'],
      sizes: ['medium', 'normal', 'small', 'mini'],
      nativeTypes: ['submit', 'button', 'reset'],
      disableds: [true, false],
      plains: [true, false],
      type: '',
      size: '',
      nativeType: '',
      disabled: false,
      plain: false
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
