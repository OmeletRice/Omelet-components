<template>
  <div :class="['om-input',
    size ? 'om-input__' + size : '',
    { 'is-disabled': disabled },
    { 'om-input-group': prepend || append },
    { 'om-input-group--prepend': prepend },
    { 'om-input-group--append': append }]">
    <div class="om-input-group__prepend" v-if="prepend">
      <slot name="prepend"></slot>
    </div>

    <input class="om-input__inner" 
      v-bind="$props"
      ref="input"
      :autocomplete="autoComplete"
      :value="currentValue"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"/>

    <span class="om-input__prefix" v-if="prefix || !!prefixIcon">
      <slot name="prefix"></slot>
      <i :class="['om-input__icon', prefixIcon]" v-if="prefixIcon"></i>
    </span>

    <span class="om-input__suffix" v-if="suffix || !!suffixIcon">
      <slot name="suffix"></slot>
      <i :class="['om-input__icon', suffixIcon]" v-if="suffixIcon"></i>
    </span>

    <div class="om-input-group__append" v-if="append">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OmInput',

  componentName: 'OmInput',

  props: {
    prepend: {
      type: Boolean,
      default: false
    },
    prefix: {
      type: Boolean,
      default: false
    },
    prefixIcon: String,

    suffix: {
      type: Boolean,
      default: false
    },
    suffixIcon: String,

    append: {
      type: Boolean,
      default: false
    },
    // input
    autoComplete: Boolean,
    label: String,
    value: [String, Number],
    name: String,
    form: String,
    id: String,
    maxlength: Number,
    minlength: Number,
    readonly: Boolean,
    autofocus: Boolean,

    // m
    size: String,
    disabled: Boolean
  },

  data() {
    return {
      currentValue: ''
    }
  },

  watch: {
    'value'(val) {
      this.setCurrentValue(val)
    }
  },

  methods: {
    focus() {
      this.$refs.input.focus()
    },
    setCurrentValue(val) {
      if (val === this.currentValue) return
      this.currentValue = val
    },
    handleInput(evt) {
      const value = evt.target.value
      this.$emit('input', value)
      this.setCurrentValue(value)
    },
    handleFocus(evt) {
      this.$emit('focus', evt)
    },
    handleBlur(evt) {
      this.$emit('blur', evt)
    },
    handleChange(evt) {
      const value = evt.target.value
      this.$emit('change', value)
    }
  }
}
</script>
