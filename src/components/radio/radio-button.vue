<template>
  <label class="om-radio-button" :class="[
                      { 'is-active': value === label },
                      { 'is-disabled': isDisabled }
                    ]" @click="handleClick">
    <input class="om-radio-button_input" :value="label" type="radio" v-model="value" :name="name" :disabled="isDisabled" />
    <span class="om-radio-button_span">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script>
export default {
  name: 'OmRadioButton',

  props: {
    label: {},
    disabled: {
      type: Boolean,
      default: false
    },
    name: String
  },
  computed: {
    value: {
      get() {
        return this._radioGroup.value
      },
      set(value) {
        this._radioGroup.$emit('input', value)
      }
    },
    _radioGroup() {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName !== 'OmRadioGroup') {
          parent = parent.$parent
        } else {
          return parent
        }
      }
      return false
    },
    isDisabled() {
      return this.disabled || this._radioGroup.disabled
    }
  },
  methods: {
    handleClick() {
      this.$parent.scale = this.label
    }
  }

}
</script>
