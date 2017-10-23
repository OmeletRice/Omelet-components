<template>
  <li
    :class="{
      'om-submenu': true,
      'is-active': active,
      'is-opened': opened
    }"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <div class="om-submenu__title" ref="submenu-title" @click="handleClick" :style="paddingStyle">
      <slot name="title"></slot>
      <i :class="{
        'om-submenu__icon-arrow': true,
        'om-icon-caret-bottom': rootMenu.mode === 'horizontal',
        'om-icon-arrow-down': rootMenu.mode === 'vertical' && !rootMenu.collapse,
        'om-icon-caret-right': rootMenu.mode === 'vertical' && rootMenu.collapse
      }">
      </i>
    </div>
    <template v-if="rootMenu.mode === 'horizontal' || (rootMenu.mode === 'vertical' && rootMenu.collapse)">
      <transition :name="menuTransitionName">
        <ul class="om-menu" v-show="opened"><slot></slot></ul>
      </transition>
    </template>
    <om-collapse-transition v-else>
      <ul class="om-menu" v-show="opened"><slot></slot></ul>
    </om-collapse-transition>
  </li>
</template>
<script>
  import OmCollapseTransition from '../utils/collapse-transition';
  import menuMixin from './menu-mixin';
  import Emitter from '../mixins/emitter';

  export default {
    name: 'OmSubmenu',

    componentName: 'OmSubmenu',

    mixins: [menuMixin, Emitter],

    components: { OmCollapseTransition },

    props: {
      index: {
        type: String,
        required: true
      }
    },

    data() {
      return {
        timeout: null,
        items: {},
        submenus: {}
      };
    },
    computed: {
      menuTransitionName() {
        return this.rootMenu.collapse ? 'om-zoom-in-left' : 'om-zoom-in-top';
      },
      opened() {
        return this.rootMenu.openedMenus.indexOf(this.index) > -1;
      },
      active: {
        cache: false,
        get() {
          let isActive = false;
          const submenus = this.submenus;
          const items = this.items;

          Object.keys(items).forEach(index => {
            if (items[index].active) {
              isActive = true;
            }
          });

          Object.keys(submenus).forEach(index => {
            if (submenus[index].active) {
              isActive = true;
            }
          });

          return isActive;
        }
      }
    },
    methods: {
      addItem(item) {
        this.$set(this.items, item.index, item);
      },
      removeItem(item) {
        delete this.items[item.index];
      },
      addSubmenu(item) {
        this.$set(this.submenus, item.index, item);
      },
      removeSubmenu(item) {
        delete this.submenus[item.index];
      },
      handleClick() {
        const {rootMenu} = this;
        if (
          (rootMenu.menuTrigger === 'hover' && rootMenu.mode === 'horizontal') ||
          (rootMenu.collapse && rootMenu.mode === 'vertical')
        ) {
          return;
        }
        this.dispatch('OmMenu', 'submenu-click', this);
      },
      handleMouseenter() {
        const {rootMenu} = this;
        if (
          (rootMenu.menuTrigger === 'click' && rootMenu.mode === 'horizontal') ||
          (!rootMenu.collapse && rootMenu.mode === 'vertical')
        ) {
          return;
        }
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.rootMenu.openMenu(this.index, this.indexPath);
        }, 300);
      },
      handleMouseleave() {
        const {rootMenu} = this;
        if (
          (rootMenu.menuTrigger === 'click' && rootMenu.mode === 'horizontal') ||
          (!rootMenu.collapse && rootMenu.mode === 'vertical')
        ) {
          return;
        }
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.rootMenu.closeMenu(this.index);
        }, 300);
      }
    },
    created() {
      this.parentMenu.addSubmenu(this);
      this.rootMenu.addSubmenu(this);
    },
    beforeDestroy() {
      this.parentMenu.removeSubmenu(this);
      this.rootMenu.removeSubmenu(this);
    }
  };
</script>
