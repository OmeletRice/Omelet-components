<template>
  <div class="om-radio-group">
    <slot></slot>
  </div>  
</template>

<script>
export default {
  name: 'OmRadioGroup',

  componentName: 'OmRadioGroup',

  props: {
    value: {},

    size: String,

    disabled: Boolean
  },

  watch: {
    value(value) {
      this.$emit('change', value)
    }
  }
}
</script>
