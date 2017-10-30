<template>
  <div class="om-input-changebox"
    :class="[
      size ? 'om-input-changebox--' + size : '',
      { 'is-disabled': disabled ,
        'is-editing': isEditing,
        'om-input-changebox--prefix': $slots.prefix || prefixIcon }
    ]">
    <input class="om-input-changebox__inner" 
      ref="input"
      :disabled="disabled"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      @change="handleChange"
      :value="val"/>
    <span class="om-input-changebox__prefix" v-if="$slots.prefix || prefixIcon"        
      :style="prefixOffset" @click.stop="handlePrefixIconClick">
      <slot name="prefix"></slot>
      <i class="om-input-changebox__icon"
          v-if="prefixIcon"
          :class="prefixIcon">
      </i>
    </span>
    <span class="om-input-changebox__btn" 
      v-if="checkBtn" 
      v-show="isEditing">
      <span class="om-input-changebox__btn-cancel"
         @click.stop="handleCancel">
        <i class="om-icon om-icon-roundclose"></i>
      </span>
      <span class="om-input-changebox__btn-confirm" 
        @click.stop="handleConfirm">
        <i class="om-icon om-icon-roundcheck"></i>
      </span>
    </span>
  </div>
</template>
<script>
export default {
  name: 'OmInputChangebox',

  props: {
    value: String,
    beforeChanged: Function,
    size: String,
    icon: String,
    prefixIcon: String,
    checkBtn: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isEditing: false,
      val: this.value,
      oldVal: this.value,
      prefixOffset: null
    }
  },

  watch: {
    value(value) {
      this.val = value
    }
  },

  methods: {
    handleFocus(val) {
      this.isEditing = true
    },
    handleInput(event) {
      this.val = event.target.value
      this.$emit('input', this.val)
    },
    handleChange(event) {
      this.$emit('change', event.target.value)
    },
    handleIconClick() {
      this.isEditing = true
    },
    handleBlur() {
      this.handleConfirm()
    },
    handleCancel() {
      this.change(false)
    },
    handleConfirm() {
      if (this.val === this.oldVal) {
        this.isEditing = false
        return null
      } else if (typeof this.beforeChanged === 'function') {
        this.beforeChanged(this.change)
      } else {
        this.change(true)
      }
    },
    change(cancel) {
      if (cancel !== false) {
        this.$emit('changed', this.val)
        this.oldVal = this.val
        this.isEditing = false
      } else {
        this.val = this.oldVal
      }
    },
    handlePrefixIconClick() {
      this.isEditing = true
    },
    focus() {
      this.$refs.input.focus()
    }
  },

  mounted() {
    this.val = this.value
    this.prefixOffset = {
      transform: `translateX(0px)`
    }
  }
}
</script>
