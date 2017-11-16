<template>
  <div :class="['om-input-number',
    size ? 'om-input-number--' + size : '',
    { 'is-disabled': disabled },
    { 'is-without-controls': !controls },
    controlPosition ? 'is-controls-' + controlPosition : '']">
    
    <span :class="['om-input-number__decrease',
      { 'is-disabled': minDisabled },
      { 'is-active': decreaseAction }]"
      v-if="controls"
      v-repeat-click="decrease"
      @mousedown="decreaseAction = minDisabled ? false : true"
      @mouseup="decreaseAction = false"
      @keydown.enter="decrease"
      role="button"
      >
      <i :class="[controlPosition ? 'om-icon-arrow-down' : 'om-icon-minus']"></i>
    </span>

    <span :class="['om-input-number__increase',
      { 'is-disabled': maxDisabled },
      { 'is-active': increaseAction }]"
      v-if="controls"
      v-repeat-click="increase"
      @mousedown="increaseAction = maxDisabled ? false : true"
      @mouseup="increaseAction = false"
      @keydown.enter="increase"
      role="button">
      <i :class="[controlPosition ? 'om-icon-arrow-up' : 'om-icon-plus']"></i>
    </span>
    
    <om-input
      ref="input"
      :value="currentValue"
      @keydown.up.native.prevent="increase"
      @keydown.down.native.prevent="decrease"
      @input="debounceHandleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      :disabled="disabled"
      :size="size"
      :max="max"
      :min="min"
      :label="label"
      :name="name">
    </om-input>
  </div>
</template>

<script>
import OmInput from 'omelet-ui/src/packages/input'
import debounce from 'throttle-debounce/debounce'
import RepectClick from 'omelet-ui/src/directives/repeat-click'
export default {
  name: 'OmInputNumber',

  components: {
    OmInput
  },

  directives: {
    repeatClick: RepectClick
  },

  props: {
    controls: {
      type: Boolean,
      default: true
    },
    size: String,
    controlPosition: String,
    disabled: Boolean,

    name: String,
    label: String,

    value: {
      type: Number,
      default: 0
    },
    min: Number,
    max: Number,
    step: {
      type: Number,
      default: 1
    },
    debounce: {
      type: Number,
      default: 300
    }
  },

  data() {
    return {
      currentValue: 0,
      debounceHandleInput: null,
      decreaseAction: false,
      increaseAction: false
    }
  },

  watch: {
    'value': {
      immediate: true,
      handler(value) {
        let val = typeof value === 'number' ? value : Number(value)
        if (isNaN(val)) return
        if (val >= this.max) val = this.max
        if (val <= this.min) val = this.min
        this.currentValue = val
        this.$emit('input', val)
      }
    }
  },

  computed: {
    minDisabled() {
      return this._decrease(this.value, this.step) < this.min
    },
    maxDisabled() {
      return this._increase(this.value, this.step) > this.max
    },
    precision() {
      const { value, step, getPrecision } = this
      return Math.max(getPrecision(value), getPrecision(step))
    }
  },

  methods: {
    toPrecision(val, precision) {
      if (precision === undefined) precision = this.precision
      return parseFloat(Number(val).toFixed(precision))
    },
    getPrecision() {
      const valueStr = this.value.toString()
      const dotPosition = valueStr.indexOf('.')
      let precision = 0
      if (dotPosition !== -1) {
        precision = valueStr.length - dotPosition - 1
      }
      return precision
    },
    setCurrentValue(val) {
      let newVal = val
      const oldVal = this.currentValue
      if (!isNaN(newVal)) {
        if (newVal <= this.min) newVal = this.min
        if (newVal >= this.max) newVal = this.max
        if (oldVal === newVal) {
          this.$refs.input.setCurrentValue(this.currentValue)
          return
        }
        this.currentValue = newVal
        this.$emit('change', newVal, oldVal)
        this.$emit('input', val)
      } else {
        this.$refs.input.setCurrentValue(this.currentValue)
      }
    },
    _decrease(val, step) {
      if (typeof val !== 'number') return this.currentValue
      const precisionFactor = Math.pow(10, this.precision)
      return this.toPrecision((precisionFactor * val - precisionFactor * step) / precisionFactor)
    },
    decrease() {
      if (this.disabled || this.minDisabled) return
      const value = this.value || 0
      const newVal = this._decrease(value, this.step)
      if (newVal < this.min) return
      this.setCurrentValue(newVal)
    },
    _increase(val, step) {
      if (typeof val !== 'number') return this.currentValue
      const precisionFactor = Math.pow(10, this.precision)
      return this.toPrecision((precisionFactor * val + precisionFactor * step) / precisionFactor)
    },
    increase() {
      if (this.disabled || this.maxDisabled) return
      const value = this.value || 0
      const newVal = this._increase(value, this.step)
      if (newVal > this.max) return
      this.setCurrentValue(newVal)
    },
    handleInput(val) {
      if (val === '') return
      if (val.indexOf('.') === (val.length - 1)) return
      if (val.indexOf('-') === (val.length - 1)) return
      this.setCurrentValue(Number(val))
    },
    handleFocus(evt) {
      this.$emit('focus', evt)
    },
    handleBlur(evt) {
      this.$emit('blur', evt)
      this.$refs.input.setCurrentValue(this.currentValue)
    }
  },
  created() {
    this.debounceHandleInput = debounce(this.debounce, val => {
      this.handleInput(val)
    })
  }
}
</script>
