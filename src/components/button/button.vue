<template>
  <button class="om-button"
    :disabled="disabled" 
    @click="handleClick" 
    :autofocus="autofocus" 
    :type="nativeType" 
    :class="[
        type ? 'om-button--' + type : '',
        size ? 'om-button--' + size : '',
        {
          'is-disabled': disabled,
          'is-loading': loading,
          'is-plain': plain,
          'is-round': round
        }
      ]">
    <i class="om-icon-loading" v-if="loading" @click="handleInnerClick"></i>
    <i :class="['om-icon', 'om-icon-' + icon]" v-if="icon && !loading" @click="handleInnerClick"></i>
    <span v-if="$slots.default" @click="handleInnerClick">
      <slot></slot>
    </span>
  </button>
</template>
<script>
export default {
  name: 'OmButton',

  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: String,
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean
  },

  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    },
    handleInnerClick(evt) {
      if (this.disabled) {
        evt.stopPropagation();
      }
    }
  }
};
</script>
