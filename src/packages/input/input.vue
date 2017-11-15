<template>
  <div :class="['om-input',
    size ? 'om-input--' + size : '',
    { 'is-disabled': disabled },
    { 'om-input-group': !!$slots.prepend || !!$slots.append },
    { 'om-input-group--prepend': !!$slots.prepend },
    { 'om-input-group--append': !!$slots.append },
    { 'om-input--prefix': !!$slots.prefix || prefixIcon },
    { 'om-input--suffix': !!$slots.suffix || suffixIcon }]">
    <div class="om-input-group__prepend" v-if="!!$slots.prepend">
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
      :aria-label="label">

    <span class="om-input__prefix" v-if="!!$slots.prefix || !!prefixIcon">
      <slot name="prefix"></slot>
      <i :class="['om-input__icon', prefixIcon]" v-if="prefixIcon"></i>
    </span>

    <span class="om-input__suffix" v-if="!!$slots.suffix || !!suffixIcon">
      <slot name="suffix"></slot>
      <i :class="['om-input__icon', suffixIcon]" v-if="suffixIcon"></i>
    </span>

    <div class="om-input-group__append" v-if="!!$slots.append">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OmInput',

  componentName: 'OmInput',

  props: {
    prefixIcon: String,
    suffixIcon: String,

    // input
    autoComplete: {
      type: String,
      default: 'off'
    },
    label: String,
    value: [String, Number],
    name: String,
    form: String,
    id: String,
    maxlength: Number,
    minlength: Number,
    readonly: Boolean,
    autofocus: Boolean,
    placeholder: [String, Number],

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
