<template>
  <li
    class="om-dropdown-menu__item"
    :class="{
      'is-disabled': disabled,
      'om-dropdown-menu__item--divided': divided
    }"
    @click="handleClick"
  >
    <slot></slot>
  </li>
</template>
<script>
  import Emitter from '../mixins/emitter';

  export default {
    name: 'OmDropdownItem',

    mixins: [Emitter],

    props: {
      command: null,
      disabled: Boolean,
      divided: Boolean
    },

    methods: {
      handleClick(e) {
        this.dispatch('OmDropdown', 'menu-item-click', [this.command, this]);
      }
    }
  };
</script>
