<template>
  <li class="om-menu-item-group">
    <div class="om-menu-item-group__title" :style="{paddingLeft: levelPadding + 'px'}">
      <template v-if="!$slots.title">{{title}}</template>
      <slot v-else name="title"></slot>
    </div>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>
<script>
  export default {
    name: 'OmMenuItemGroup',

    componentName: 'OmMenuItemGroup',

    inject: ['rootMenu'],
    props: {
      title: {
        type: String
      }
    },
    data() {
      return {
        paddingLeft: 20
      };
    },
    computed: {
      levelPadding() {
        let padding = 10;
        let parent = this.$parent;
        if (this.rootMenu.collapse) return 20;
        while (parent && parent.$options.componentName !== 'OmMenu') {
          if (parent.$options.componentName === 'OmSubmenu') {
            padding += 20;
          }
          parent = parent.$parent;
        }
        padding === 10 && (padding = 20);
        return padding;
      }
    }
  };
</script>

