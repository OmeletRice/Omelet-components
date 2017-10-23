<template>
  <transition name="msgbox-fade">
    <div class="om-message-box__wrapper" tabindex="-1" v-show="visible" @click.self="handleWrapperClick">
      <div class="om-message-box" :class="customClass">
        <div class="om-message-box__header" v-if="title !== undefined">
          <div class="om-message-box__title">{{ title || t('mp.messagebox.title') }}</div>
          <button type="button" class="om-message-box__headerbtn" aria-label="Close" v-if="showClose" @click="handleAction('cancel')">
            <i class="om-message-box__close om-icon om-icon-roundclose"></i>
          </button>
        </div>
        <div class="om-message-box__content" v-if="message !== ''">
          <div class="om-message-box__status" :class="[ typeClass ]"></div>
          <div class="om-message-box__message" :style="{ 'text-align': 'center', 'margin-left': typeClass ? '0px' : '0' }">
            <slot>
              <p>{{ message }}</p>
            </slot>
          </div>
          <div class="om-message-box__input" v-show="showInput">
            <om-input v-model="inputValue" @keyup.enter.native="handleAction('confirm')" :placeholder="inputPlaceholder" ref="input"></om-input>
            <div class="om-message-box__errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
          </div>
        </div>
        <div class="om-message-box__btns">
          <om-button :loading="cancelButtonLoading" :class="[ cancelButtonClasses ]" v-show="showCancelButton" @click.native="handleAction('cancel')">
            {{ cancelButtonText || 'cancel' }}
          </om-button>
          <om-button :loading="confirmButtonLoading" ref="confirm" :class="[ confirmButtonClasses ]" v-show="showConfirmButton" @click.native="handleAction('confirm')">
            {{ confirmButtonText || 'confirm' }}
          </om-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
import Popup from '../utils/popup';
import OmInput from '../input/input';
import OmButton from '../button/button';
import { addClass, removeClass } from '../utils/dom';

let typeMap = {
  success: 'circle-check',
  info: 'information',
  warning: 'warning',
  error: 'circle-cross'
};

export default {
  mixins: [Popup],

  props: {
    modal: {
      default: true
    },
    lockScroll: {
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      default: true
    },
    closeOnPressEscape: {
      default: true
    }
  },

  components: {
    OmInput,
    OmButton
  },

  computed: {
    typeClass() {
      return this.type && typeMap[this.type] ? `om-icon-${typeMap[this.type]}` : '';
    },

    confirmButtonClasses() {
      return `om-button--primary ${this.confirmButtonClass}`;
    },
    cancelButtonClasses() {
      return `${this.cancelButtonClass}`;
    }
  },

  methods: {
    getSafeClose() {
      const currentId = this.uid;
      return () => {
        this.$nextTick(() => {
          if (currentId === this.uid) this.doClose();
        });
      };
    },
    doClose() {
      if (!this.visible) return;
      this.visible = false;
      this._closing = true;

      this.onClose && this.onClose();

      if (this.lockScroll) {
        setTimeout(() => {
          if (this.modal && this.bodyOverflow !== 'hidden') {
            document.body.style.overflow = this.bodyOverflow;
            document.body.style.paddingRight = this.bodyPaddingRight;
          }
          this.bodyOverflow = null;
          this.bodyPaddingRight = null;
        }, 200);
      }
      this.opened = false;

      if (!this.transition) {
        this.doAfterClose();
      }
      if (this.action) this.callback(this.action, this);
    },

    handleWrapperClick() {
      if (this.closeOnClickModal) {
        this.handleAction('cancel');
      }
    },

    handleAction(action) {
      if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
        return;
      }
      this.action = action;
      if (typeof this.beforeClose === 'function') {
        this.close = this.getSafeClose();
        this.beforeClose(action, this, this.close);
      } else {
        this.doClose();
      }
    },

    validate() {
      if (this.$type === 'prompt') {
        var inputPattern = this.inputPattern;
        if (inputPattern && !inputPattern.test(this.inputValue || '')) {
          this.editorErrorMessage = this.inputErrorMessage || t('mp.messagebox.error');
          addClass(this.$refs.input.$el.querySelector('input'), 'invalid');
          return false;
        }
        var inputValidator = this.inputValidator;
        if (typeof inputValidator === 'function') {
          var validateResult = inputValidator(this.inputValue);
          if (validateResult === false) {
            this.editorErrorMessage = this.inputErrorMessage || t('mp.messagebox.error');
            addClass(this.$refs.input.$el.querySelector('input'), 'invalid');
            return false;
          }
          if (typeof validateResult === 'string') {
            this.editorErrorMessage = validateResult;
            return false;
          }
        }
      }
      this.editorErrorMessage = '';
      removeClass(this.$refs.input.$el.querySelector('input'), 'invalid');
      return true;
    }
  },

  watch: {
    inputValue: {
      immediate: true,
      handler(val) {
        this.$nextTick(_ => {
          if (this.$type === 'prompt' && val !== null) {
            this.validate();
          }
        });
      }
    },

    visible(val) {
      if (val) this.uid++;
      if (this.$type === 'alert' || this.$type === 'confirm') {
        this.$nextTick(() => {
          this.$refs.confirm.$el.focus();
        });
      }
      if (this.$type !== 'prompt') return;
      if (val) {
        setTimeout(() => {
          if (this.$refs.input && this.$refs.input.$el) {
            this.$refs.input.$el.querySelector('input').focus();
          }
        }, 500);
      } else {
        this.editorErrorMessage = '';
        removeClass(this.$refs.input.$el.querySelector('input'), 'invalid');
      }
    }
  },

  data() {
    return {
      uid: 1,
      title: undefined,
      message: '',
      type: '',
      customClass: '',
      showInput: false,
      inputValue: null,
      inputPlaceholder: '',
      inputPattern: null,
      inputValidator: null,
      inputErrorMessage: '',
      showConfirmButton: true,
      showCancelButton: false,
      action: '',
      confirmButtonText: '',
      cancelButtonText: '',
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      confirmButtonClass: '',
      confirmButtonDisabled: false,
      cancelButtonClass: '',
      editorErrorMessage: null,
      callback: null
    };
  }
};
</script>
