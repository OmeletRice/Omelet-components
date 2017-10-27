<script>
import Clickoutside from 'omelet-ui/src/utils/clickoutside.js'
import Emitter from 'omelet-ui/src/mixins/emitter.js'
import OmButton from 'omelet-ui/src/components/button'
import OmButtonGroup from 'omelet-ui/src/components/button-group'

export default {
  name: 'OmDropdown',

  componentName: 'OmDropdown',

  mixins: [Emitter],

  directives: { Clickoutside },

  components: {
    OmButton,
    OmButtonGroup
  },

  provide() {
    return {
      dropdown: this
    }
  },

  props: {
    trigger: {
      type: String,
      default: 'hover'
    },
    // button
    type: String,

    size: {
      type: String,
      default: ''
    },

    splitButton: {
      type: Boolean,
      default: false
    },

    hideOnClick: {
      type: Boolean,
      default: true
    },

    placement: {
      type: String,
      default: 'bottom-end'
    },

    visibleArrow: {
      type: Boolean,
      default: true
    },

    showTimeout: {
      type: Number,
      default: 250
    },

    hideTimeout: {
      type: Number,
      default: 150
    }
  },

  data() {
    return {
      timeout: null,
      visible: false,
      triggerElm: {
        disabled: false
      }
    }
  },

  mounted() {
    this.$on('menu-item-click', this.handleMenuItemClick)
    this.initEvent()
  },

  watch: {
    visible(val) {
      this.broadcast('OmDropdownMenu', 'visible', val)
      this.$emit('visible-change', val)
    }
  },

  methods: {
    show() {
      if (this.triggerElm.disabled) return
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.visible = true
      }, this.showTimeout)
    },
    hide() {
      if (this.triggerElm.disabled) return
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.visible = false
      }, this.hideTimeout)
    },
    handleClick() {
      if (this.triggerElm.disabled) return
      this.visible = !this.visible
    },
    initEvent() {
      let { trigger, show, hide, handleClick, splitButton } = this;
      let triggerElm = splitButton
        ? this.$refs.trigger.$el
        : this.$slots.default[0].elm;

      if (trigger === 'hover') {
        triggerElm.addEventListener('mouseenter', show);
        triggerElm.addEventListener('mouseleave', hide);

        let dropdownElm = this.$slots.dropdown[0].elm;

        dropdownElm.addEventListener('mouseenter', show);
        dropdownElm.addEventListener('mouseleave', hide);
      } else if (trigger === 'click') {
        triggerElm.addEventListener('click', handleClick);
      }
    },
    handleMenuItemClick(command, instance) {
      if (this.hideOnClick) {
        this.visible = false;
      }
      this.$emit('command', command, instance);
    }
  },

  computed: {
    dropdownSize() {
      return this.size || (this.$ELEMENT || {}).size
    }
  },

  render(h) {
    let { hide, splitButton, type, dropdownSize } = this;

    var handleClick = (evt) => {
      this.$emit('click', evt)
      this.hide()
    }

    let triggerElm = !splitButton
      ? this.$slots.default
      : (<om-button-group>
        <om-button type={type} size={dropdownSize} nativeOnClick={handleClick}>
          {this.$slots.default}
        </om-button>
        <om-button ref="trigger" type={type} size={dropdownSize}class="om-dropdown__caret-button">
          <i class="om-dropdown__icon om-icon-caret-bottom"></i>
        </om-button>
      </om-button-group>)

    return (
      <div class="om-dropdown" v-clickoutside={hide}>
        {triggerElm}
        {this.$slots.dropdown}
      </div>
    )
  }
}
</script>
