<template>
  <label :class="[
    'om-radio',
    { 'is-disabled' : !!disabled },
    { 'is-checked' : !!checked }
  ]">
    <span :class="[
      'om-radio__input',
      { 'is-disabled' : !!disabled },
      { 'is-checked' : !!checked }
    ]">
      <span class="om-radio__inner"></span>
      <input class="om-radio__origin"
        type="radio"
        tabindex="-1"
        :disabled="disabled"
        :checked="checked"
        :v-model="value">
    </span>
    <span class="om-radio__label">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'OmRadio',

  props: {
    label: [ String, Number, Boolean, Object ],

    value: [ String, Number, Boolean, Object ],

    disabled: {
      type: Boolean,
      default: false
    },

    border: {
      type: Boolean,
      default: false
    },

    size: String,

    name: String
  },

  computed: {
    checked() {
      return this.value === this.label
    }
  }
}
</script>

<style>

</style>
