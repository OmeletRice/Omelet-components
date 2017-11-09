<template>
  <label :class="[
    'om-radio',
    { 'is-disabled': !!isDisabled },
    { 'is-checked': checked },
    { 'is-vertical': isVertical },
    customClass]"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="model = label"
  >
    <span :class="[
      'om-radio__input',
      { 'is-disabled' : !!isDisabled },
      { 'is-checked' : checked }
    ]">
      <span class="om-radio__inner"></span>
      <input class="om-radio__origin"
        type="radio"
        :value="label"
        :name="name"
        v-model="model"
        tabindex="-1"
        :disabled="isDisabled"
        @change="handleChange">
    </span>
    <span class="om-radio__label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
export default {
  name: 'OmRadio',

  componentsName: 'OmRadio',

  props: {
    label: [ String, Number, Boolean, Object ],

    value: [ String, Number, Boolean, Object ],

    disabled: {
      type: Boolean,
      default: false
    },

    name: String,

    customClass: String
  },

  data() {
    return {
      _radioGroup: null
    }
  },

  computed: {
    isGroup() {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName !== 'OmRadioGroup') {
          parent = parent.$parent
        } else {
          this._radioGroup = parent
          return true
        }
      }
      return false
    },
    model: {
      get() {
        return this.isGroup ? this._radioGroup.value : this.value
      },
      set(val) {
        if (this.isGroup) {
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
      return this.isGroup ? this._radioGroup.disabled : this.disabled
    },
    isVertical() {
      return this.isGroup ? !!this._radioGroup.vertical : false
    },
    tabIndex() {
      return !this.isDisabled ? (this.isGroup ? (this.checked ? 0 : -1) : 0) : -1
    }
  },

  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.$emit('change', this.model)
      })
    }
  }
}
</script>
