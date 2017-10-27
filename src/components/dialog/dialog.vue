<template>
  <transition name="dialog-fade">
    <div class="om-dialog__wrapper" v-show="visible" @click.self="handleWrapperClick">
      <div class="om-dialog" 
        ref="dialog" 
        :class="[{ 'is-fullscreen': fullscreen }, { 'om-dialog--center': center }, customClass]" 
        :style="style">
        <div class="om-dialog__header">
          <slot name="title">
            <span class="om-dialog__title">{{title}}</span>
          </slot>
          <button type="button" class="om-dialog__headerbtn" aria-label="Close" v-if="showClose" @click="handleClose">
            <i class="om-dialog__close om-icon-close"></i>
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
import Popup from 'omelet-ui/src/utils/popup';
import emitter from 'omelet-ui/src/mixins/emitter';

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

    appendToBody: {
      type: Boolean,
      default: false
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

    customClass: {
      type: String,
      default: ''
    },

    top: {
      type: String,
      default: '15%'
    },

    beforeClose: Function,

    width: String,

    fullscreen: Boolean,

    center: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      closed: false
    }
  },

  watch: {
    visible(val) {
      this.$emit('update:visible', val);
      if (val) {
        this.closed = false
        this.$emit('open')
        this.$el.addEventListener('scroll', this.updatePopper)
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0
        });
        if (this.appendToBody) {
          document.body.appendChild(this.$el)
        }
      } else {
        this.$el.removeEventListener('scroll', this.updatePopper)
        if (!this.closed) this.$emit('close')
      }
    }
  },

  computed: {
    style() {
      let style = {}
      if (this.width) {
        style.width = this.width
      }
      if (!this.fullscreen) {
        style.marginTop = this.top
      }
      return style
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
        this.$emit('update:visible', false)
        this.$emit('close')
        this.closed = true
      }
    },
    updatePopper() {
      this.broadcast('OmSelectDropdown', 'updatePopper')
      this.broadcast('OmDropdownMenu', 'updatePopper')
    }
  },

  mounted() {
    if (this.visible) {
      this.rendered = true
      this.open();
      if (this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    }
  }
}
</script>
