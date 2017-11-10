<template>
  <div class="om-checkbox-group">
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

    max: Number
  },

  data() {
    return {
      activeValue: this.value
    }
  },

  methods: {
    handleChange() {
      this.$emit('change', this.activeValue)
    },
    handleAdd(item) {
      console.log(item)
    }
  }
}
</script>

