<template>
  <div :class="['om-textarea',
    { 'is-disabled': disabled }]">
    <textarea class="om-textarea__inner"
      :value="currentValue"
      ref="textarea"
      v-bind="$props"
      :style="textareaStyle"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label">
    </textarea>
  </div>  
</template>

<script>
import calcTextareaHeight from './calcTextareaHeight'
import merge from 'omelet-ui/src/utils/merge'
export default {
  name: 'OmTextarea',

  componentName: 'OmTextarea',

  props: {
    // na
    autofocus: Boolean,
    cols: Number,
    rows: Number,
    name: String,
    readonly: Boolean,
    placeholder: [String, Number],
    maxlength: Number,
    form: String,
    id: String,
    spellcheck: Boolean,

    label: String,
    value: [String, Number],
    disabled: Boolean,

    resize: String,
    autosize: {},
    maxsize: {}
  },

  data() {
    return {
      currentValue: '',
      textareaCalcStyle: {}
    }
  },

  watch: {
    'value'(val) {
      this.setCurrentValue(val)
    }
  },

  computed: {
    textareaStyle() {
      let maxStyle = {}
      if (this.maxsize) {
        maxStyle.maxHeight = this.maxsize.maxHeight
        maxStyle.maxWidth = this.maxsize.maxWidth
      }
      return merge({}, this.textareaCalcStyle, {resize: this.resize}, maxStyle)
    }
  },

  methods: {
    focus() {
      this.$refs.textarea.focus()
    },
    setCurrentValue(val) {
      if (this.currentValue === val) return
      this.$nextTick(() => {
        this.resizeTextarea()
      })
      this.currentValue = val
    },
    handleInput(evt) {
      const value = evt.target.value
      this.$emit('input', value)
      this.setCurrentValue(value)
    },
    handleChange(evt) {
      const value = evt.target.value
      this.$emit('change', value)
    },
    handleBlur(evt) {
      this.$emit('blur', evt)
    },
    handleFocus(evt) {
      this.$emit('focus', evt)
    },
    resizeTextarea() {
      if (this.$isServer) return
      if (!this.autosize) {
        this.textareaCalcStyle = {
          minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
        }
        return null
      } else {
        const { minRows, maxRows } = this.autosize
        this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows)
      }
    }
  },

  mounted() {
    this.resizeTextarea()
  }
}
</script>
