<template>
  <label :class="[
    'om-radio-button',
    { 'is-disabled': !!isDisabled },
    { 'is-checked': checked },
    customClass]"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="model = label"
  >
    <input class="om-radio-button__input"
      type="radio"
      :value="label"
      :name="name"
      v-model="model"
      tabindex="-1"
    />
    <span :class="[
      'om-radio-button__inner',
      { 'is-disabled': isDisabled },
      { 'is-checked': checked }]"
    >
     <slot></slot>
     <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>  
</template>

<script>
export default {
  name: 'OmRadioButton',

  componentName: 'OmRadioButton',

  props: {
    disabled: Boolean,

    label: [ String, Number, Boolean, Object ],

    value: [ String, Number, Boolean, Object ],

    name: String,

    customClass: String
  },

  computed: {
    _radioGroup() {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName !== 'OmRadioGroup') {
          parent = parent.$parent
        } else {
          return parent
        }
      }
      return null
    },
    model: {
      get() {
        return this._radioGroup ? this._radioGroup.value : this.value
      },
      set(val) {
        if (this._radioGroup) {
          this._radioGroup.$emit('input', val)
        } else {
          this.$emit('input', val)
        }
      }
    },
    checked() {
      return this.label === this.model
    },
    isDisabled() {
      return this._radioGroup ? this._radioGroup.disabled : this.disabled
    },
    tabIndex() {
      return !this.isDisabled ? (this.isGroup ? (this.checked ? 0 : -1) : 0) : -1
    }
  }
}
</script>

<style>

</style>
