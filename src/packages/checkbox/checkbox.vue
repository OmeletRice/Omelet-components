<template>
  <label :class="[
    'om-checkbox',
    { 'is-disabled': isDisabled },
    { 'is-indeterminate': indeterminate },
    { 'is-checked': isChecked },
    customClass]"
    role="checkbox"
    :id="id"
    :aria-checked="indeterminate ? 'mixed' : isChecked"
    :aria-disabled="isDisabled"
  >
    <span :class="[
      'om-checkbox__input',
      { 'is-disabled': isDisabled },
      { 'is-indeterminate': indeterminate },
      { 'is-checked': isChecked }]">
      <span class="om-checkbox__inner"></span>
      <input class="om-checkbox__origin"
        type="checkbox"
        :name="name"
        :disabled="isDisabled"
        v-model="model"
        @change="handleChange"
       />
    </span>
    <span class="om-checkbox__label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>  
</template>

<script>
export default {
  name: 'OmCheckbox',

  componentName: 'OmCheckbox',

  props: {
    label: {
      type: [ String, Number, Boolean ],
      default: null
    },

    value: [ String, Number, Boolean ],

    disabled: {
      type: Boolean,
      default: false
    },

    name: String,

    trueLabel: [ String, Number ],

    falseLabel: [ String, Number ],

    checked: Boolean,

    customClass: String,

    indeterminate: {
      type: Boolean,
      default: false
    },

    id: String,

    controls: String
  },

  data() {
    return {
      _checkboxGroup: null,
      selfModel: this.value
    }
  },

  computed: {
    isCrVal() {
      return !!this.trueLabel || !!this.falseLabel
    },
    isGroup() {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName !== 'OmCheckboxGroup') {
          parent = parent.$parent
        } else {
          this._checkboxGroup = parent
          return true
        }
        return false
      }
    },
    model: {
      get() {
        if (this.isGroup) {
          const parentValues = this._checkboxGroup.value
          for (let i = 0, len = parentValues.length; i < len; i++) {
            if (this.label === parentValues[i]) {
              return true
            }
          }
        } else {
          if (this.isCrVal) {
            if (this.selfModel === this.trueLabel) return true
            if (this.selfModel === this.falseLabel) return false
          } else {
            if (this.label !== null) {
              return this.selfModel === this.label
            }
            return this.value === undefined ? this.selfModel : !!this.value
          }
        }
      },
      set(val) {
        if (this.isGroup) {
          const parentValues = this._checkboxGroup.value
          const lt = parentValues.indexOf(this.label)
          let newVal = []
          const { min, max } = this._checkboxGroup
          parentValues.forEach((v, i) => {
            if (lt !== i) newVal.push(v)
          })
          if ((lt === -1 && !(max !== undefined && parentValues.length + 1 > max)) || (min !== undefined && parentValues.length - 1 < min)) {
            newVal.push(this.label)
          }
          this._checkboxGroup.$emit('input', newVal)
        } else {
          this.$emit('input', val)
          if (this.isCrVal) {
            this.selfModel = val ? this.trueLabel : this.falseLabel
          } else {
            if (this.label !== null) {
              this.selfModel = val ? this.label : ''
            } else {
              this.selfModel = val
            }
          }
        }
      }
    },
    isChecked() {
      return this.model
    },
    isDisabled() {
      return this.isGroup ? this._checkboxGroup.disabled || this.disabled : this.disabled
    }
  },

  methods: {
    handleChange() {
      if (this.isGroup) {
        this.$nextTick(() => {
          this._checkboxGroup.$emit('change', this._checkboxGroup.value)
        })
      } else {
        this.$emit('change', this.selfModel)
      }
    }
  },

  mounted() {
    if (this.indeterminate) {
      this.$el.setAttribute('aria-controls', this.controls)
    }
  }
}
</script>
