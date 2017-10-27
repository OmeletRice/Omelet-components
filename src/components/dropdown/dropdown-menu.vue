<template>
  <transition name="om-zoom-in-top" @after-leave="doDestroy">
    <ul class="om-dropdown-menu om-popper" 
        :class="[ size && `om-dropdown-menu--${size}`]" 
        v-show="showPopper">
      <slot></slot>
    </ul>
  </transition>
</template>
<script>
  import Popper from 'omelet-ui/src/utils/vue-popper'

  export default {
    name: 'OmDropdownMenu',

    componentName: 'OmDropdownMenu',

    mixins: [Popper],

    inject: ['dropdown'],

    // props: {
    //   visibleArrow: {
    //     type: Boolean,
    //     default: true
    //   }
    // },

    data() {
      return {
        size: this.dropdown.size
      }
    },

    created() {
      this.$on('updatePopper', () => {
        if (this.showPopper) this.updatePopper()
      })
      this.$on('visible', val => {
        this.showPopper = val
      })
    },

    mounted() {
      this.$parent.popperElm = this.popperElm = this.$el
      this.referenceElm = this.$parent.$el
    },

    watch: {
      'dropdown.placement': {
        immediate: true,
        handler(val) {
          this.currentPlacement = val
        }
      }
    }
  };
</script>
