<template>
  <label :class="[
    'om-checkbox',
    { 'is-checked': isChecked }]"
    role="checkbox"
  >
    <span class="om-checkbox__input">
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

    indeterminate: {
      type: Boolean,
      default: false
    }
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

    }
  },

  methods: {
    handleChange() {
      if (this.isGroup) {
        if (this._checkboxGroup.addCheck) {
          // this._checkboxGroup.addCheck(this.selfModel)
        }
      } else {
        this.$emit('change', this.selfModel)
      }
    }
  }
}
</script>
