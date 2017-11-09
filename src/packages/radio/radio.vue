<template>
  <label :class="[
    'om-radio',
    { 'is-disabled' : !!disabled },
    { 'is-checked' : checked }]"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="disabled"
    @keydown.space.stop.prevent="model = label"
  >
    <span :class="[
      'om-radio__input',
      { 'is-disabled' : !!disabled },
      { 'is-checked' : checked }
    ]">
      <span class="om-radio__inner"></span>
      <input class="om-radio__origin"
        type="radio"
        :value="label"
        :name="name"
        v-model="model"
        tabindex="-1"
        :disabled="disabled"
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

    border: {
      type: Boolean,
      default: false
    },

    size: String,

    name: String
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
        if (parent.$options.componentsName !== 'OmRadioGroup') {
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
        return this._radioGroup ? this._radioGroup.value : this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    checked() {
      return this.label === this.model
    }
  },

  methods: {
    handleChange() {
      // this.$nextTick(() => {
      //   this.$emit('change', this.model)
      // })
    }
  }
}
</script>
