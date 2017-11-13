<template>
  <div class="om-checkbox-group" :class="customClass" aria-label="checkbox-group">
    <slot></slot>
  </div>  
</template>

<script>
export default {
  name: 'OmCheckboxGroup',

  componentName: 'OmCheckboxGroup',

  props: {
    value: Array,

    size: String,

    disabled: Boolean,

    min: Number,

    max: Number,

    customClass: String
  },

  data() {
    return {
      activeValue: this.value
    }
  },

  methods: {
    handleChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>

