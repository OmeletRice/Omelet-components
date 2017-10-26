<template>
  <transition name="dialog-fade">
    <div class="om-dialog__wrapper" v-show="visible" @click.self="handleWrapperClick">
      <div class="om-dialog" :class="[sizeClass, customClass]" ref="dialog" :style="style">
        <div class="om-dialog__header">
          <slot name="title">
            <span class="om-dialog__title">{{title}}</span>
          </slot>
          <button type="button" class="om-dialog__headerbtn" aria-label="Close" v-if="showClose" @click="handleClose">
            <i class="om-dialog__close om-icon om-icon-roundclose"></i>
          </button>
        </div>
        <div class="om-dialog__body" v-if="rendered">
          <slot></slot>
        </div>
        <div class="om-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Popup from '../utils/popup';
import emitter from '../mixins/emitter';

export default {
  name: 'OmDialog',

  mixins: [Popup, emitter],

  props: {
    title: {
      type: String,
      default: ''
    },

    modal: {
      type: Boolean,
      default: true
    },

    modalAppendToBody: {
      type: Boolean,
      default: true
    },

    lockScroll: {
      type: Boolean,
      default: true
    },

    closeOnClickModal: {
      type: Boolean,
      default: true
    },

    closeOnPressEscape: {
      type: Boolean,
      default: true
    },

    showClose: {
      type: Boolean,
      default: true
    },

    size: {
      type: String,
      default: 'small'
    },

    customClass: {
      type: String,
      default: ''
    },

    top: {
      type: String,
      default: '15%'
    },
    beforeClose: Function
  },

  watch: {
    visible(val) {
      this.$emit('update:visible', val);
      if (val) {
        this.$emit('open');
        this.$el.addEventListener('scroll', this.updatePopper);
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0;
        });
      } else {
        this.$el.removeEventListener('scroll', this.updatePopper);
        this.$emit('close');
      }
    }
  },

  computed: {
    sizeClass() {
      return `om-dialog--${this.size}`;
    },
    style() {
      return this.size === 'full' ? {} : { 'top': this.top };
    }
  },

  methods: {
    handleWrapperClick() {
      if (!this.closeOnClickModal) return;
      this.handleClose();
    },
    handleClose() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false);
        this.$emit('visible-change', false);
      }
    },
    updatePopper() {
      this.broadcast('OmSelectDropdown', 'updatePopper');
      this.broadcast('OmDropdownMenu', 'updatePopper');
    }
  },

  mounted() {
    this.$parent.popperElm = this.popperElm = this.$el;
    this.referenceElm = this.$parent.$el;
    if (this.visible) {
      this.rendered = true;
      this.open();
    }
  }
};
</script>

<style>
  @import './dialog.css';
  .om-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: .5;
  background: #000;
}
</style>
