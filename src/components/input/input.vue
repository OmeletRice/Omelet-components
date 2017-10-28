<template>
  <div :class="[
    type === 'textarea' ? 'om-textarea' : 'om-input',
    inputSize ? 'om-input--' + inputSize : '',
    {
      'is-disabled': disabled,
      'om-input-group': $slots.prepend || $slots.append,
      'om-input-group--append': $slots.append,
      'om-input-group--prepend': $slots.prepend,
      'om-input--prefix': $slots.prefix || prefixIcon,
      'om-input--suffix': $slots.suffix || suffixIcon
    }
  ]">
    <template v-if="type !== 'textarea'">
      <!-- prepend -->
      <div class="om-input-group__prepend" v-if="$slots.prepend"  tabindex="0">
        <slot name="prepend"></slot>
      </div>
      <input
        v-if="type !== 'textarea'"
        class="om-input__inner"
        v-bind="$props"
        :autocomplete="autoComplete"
        :value="currentValue"
        ref="input"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label"
      >
      <!-- prefix -->
      <span class="om-input__prefix" v-if="$slots.prefix || prefixIcon" :style="prefixOffset">
        <slot name="prefix"></slot>
        <i class="om-input__icon"
           v-if="prefixIcon"
           :class="prefixIcon">
        </i>
      </span>
      <!-- suffix -->
      <span
        class="om-input__suffix"
        v-if="$slots.suffix || suffixIcon || validateState && needStatusIcon"
        :style="suffixOffset">
        <span class="om-input__suffix-inner">
          <slot name="suffix"></slot>
          <i class="om-input__icon"
            v-if="suffixIcon"
            :class="suffixIcon">
          </i>
        </span>
        <i class="om-input__icon"
          v-if="validateState"
          :class="['om-input__validateIcon', validateIcon]">
        </i>
      </span>
      <!-- append -->
      <div class="om-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      class="om-textarea__inner"
      :value="currentValue"
      @input="handleInput"
      ref="textarea"
      v-bind="$props"
      :style="textareaStyle"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"
    >
    </textarea>
  </div>
</template>
<script>
import emitter from 'omelet-ui/src/mixins/emitter'
import calcTextareaHeight from './calcTextareaHeight'
import merge from 'omelet-ui/src/utils/merge'

export default {
  name: 'OmInput',

  componentName: 'OmInput',

  mixins: [emitter],

  inject: {
    omForm: {
      default: ''
    },
    onFormItem: {
      default: ''
    }
  },

  data() {
    return {
      currentValue: this.value,
      textareaCalcStyle: {},
      prefixOffset: null,
      suffixOffset: null
    }
  },

  props: {
    value: [String, Number],
    placeholder: String,
    size: String,
    resize: String,
    name: String,
    form: String,
    id: String,
    maxlength: Number,
    minlength: Number,
    readonly: Boolean,
    autofocus: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    rows: {
      type: Number,
      default: 2
    },
    autoComplete: {
      type: String,
      default: 'off'
    },
    max: {},
    min: {},
    step: {},
    validateEvent: {
      type: Boolean,
      default: true
    },
    suffixIcon: String,
    prefixIcon: String,
    label: String
  },

  computed: {
    _omFormItemSize() {
      return (this.omFormItem || {}).omFormItemSize
    },
    validateState() {
      return this.omFormItem ? this.omFormItem.validateState : ''
    },
    needStatusIcon() {
      return this.omForm ? this.omForm.statusIcon : false
    },
    validateIcon() {
      return {
        validating: 'om-icon-loading',
        success: 'om-icon-circle-check',
        error: 'om-icon-circle-close'
      }[this.validateState]
    },
    textareaStyle() {
      return merge({}, this.textareaCalcStyle, { resize: this.resize })
    },
    inputSize() {
      return this.size || this._omFormItemSize || (this.$ELEMENT || {}).size
    },
    isGroup() {
      return this.$slots.prepend || this.$slots.append
    }
  },

  watch: {
    'value'(val, oldValue) {
      this.setCurrentValue(val)
    }
  },

  methods: {
    handleBlur(event) {
      this.$emit('blur', event)
      if (this.validateEvent) {
        this.dispatch('OmFormItem', 'om.form.blur', [this.currentValue])
      }
    },
    inputSelect() {
      this.$refs.input.select()
    },
    resizeTextarea() {
      if (this.$isServer) return
      var { autosize, type } = this
      if (type !== 'textarea') return
      if (!autosize) {
        this.textareaCalcStyle = {
          minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
        }
        return
      }
      const minRows = autosize.minRows
      const maxRows = autosize.maxRows

      this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows)
    },
    handleFocus(event) {
      this.$emit('focus', event)
    },
    handleInput(event) {
      const value = event.target.value
      this.$emit('input', value)
      this.setCurrentValue(value)
    },
    handleChange(event) {
      this.$emit('change', event.target.value)
    },
    setCurrentValue(value) {
      if (value === this.currentValue) return
      this.$nextTick(_ => {
        this.resizeTextarea()
      })
      this.currentValue = value
      if (this.validateEvent) {
        this.dispatch('OmFormItem', 'om.form.change', [value])
      }
    },
    calcIconOffset(place) {
      const pendantMap = {
        'suf': 'append',
        'pre': 'prepend'
      }

      const pendant = pendantMap[place]

      if (this.$slots[pendant]) {
        return { transform: `translateX(${place === 'suf' ? '-' : ''}${this.$el.querySelector(`.om-input-group__${pendant}`).offsetWidth}px)` }
      }
    },
    focus() {
      this.$refs.input.focus()
    }
  },

  created() {
    this.$on('inputSelect', this.inputSelect)
  },

  mounted() {
    this.resizeTextarea()
    if (this.isGroup) {
      this.prefixOffset = this.calcIconOffset('pre')
      this.suffixOffset = this.calcIconOffset('suf')
    }
  }
}
</script>
