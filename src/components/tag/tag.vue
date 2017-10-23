<template>
  <transition :name="closeTransition ? '' : 'om-zoom-in-center'">
    <span
      class="om-tag"
      :class="[type ? 'om-tag--' + type : '', {'is-hit': hit}]"
      :style="{backgroundColor: color}">
      <slot></slot>
      <i class="om-tag__close om-icon-close"
        v-if="closable"
        @click="handleClose"></i>
    </span>
  </transition>
</template>
<script>
  export default {
    name: 'OmTag',
    props: {
      text: String,
      closable: Boolean,
      type: String,
      hit: Boolean,
      closeTransition: Boolean,
      color: String
    },
    methods: {
      handleClose(event) {
        this.$emit('close', event);
      }
    }
  };
</script>
