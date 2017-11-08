<template>
  <div :class="[
    'om-button-group',
    customClass]">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'OmButtonGroup',

    props: {
      customClass: String
    }
  }
</script>
