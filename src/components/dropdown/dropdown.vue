<script>
import Clickoutside from '../utils/clickoutside.js';
import Emitter from '../mixins/emitter.js';
import OmButton from '../button/button';
import OmButtonGroup from '../button/button-group';

export default {
  name: 'OmDropdown',

  componentName: 'OmDropdown',

  mixins: [Emitter],

  directives: { Clickoutside },

  components: {
    OmButton,
    OmButtonGroup
  },

  props: {
    trigger: {
      type: String,
      default: 'hover'
    },
    menuAlign: {
      type: String,
      default: 'end'
    },
    type: String,
    size: String,
    splitButton: Boolean,
    hideOnClick: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      timeout: null,
      visible: false
    };
  },

  mounted() {
    this.$on('menu-item-click', this.handleMenuItemClick);
    this.initEvent();
  },

  watch: {
    visible(val) {
      this.broadcast('OmDropdownMenu', 'visible', val);
      this.$emit('visible-change', val);
    }
  },

  methods: {
    show() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.visible = true;
      }, 250);
    },
    hide() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.visible = false;
      }, 150);
    },
    handleClick() {
      this.visible = !this.visible;
    },
    initEvent() {
      let { trigger, show, hide, handleClick, splitButton } = this;
      let triggerOmm = splitButton
        ? this.$refs.trigger.$el
        : this.$slots.default[0].elm;

      if (trigger === 'hover') {
        triggerOmm.addEventListener('mouseenter', show);
        triggerOmm.addEventListener('mouseleave', hide);

        let dropdownOmm = this.$slots.dropdown[0].elm;

        dropdownOmm.addEventListener('mouseenter', show);
        dropdownOmm.addEventListener('mouseleave', hide);
      } else if (trigger === 'click') {
        triggerOmm.addEventListener('click', handleClick);
      }
    },
    handleMenuItemClick(command, instance) {
      if (this.hideOnClick) {
        this.visible = false;
      }
      this.$emit('command', command, instance);
    }
  },

  render(h) {
    let { hide, splitButton, type, size } = this;

    var handleClick = _ => {
      this.$emit('click');
    };

    let triggerOmm = !splitButton
      ? this.$slots.default
      : (<om-button-group>
        <om-button type={type} size={size} nativeOn-click={handleClick}>
          {this.$slots.default}
        </om-button>
        <om-button ref="trigger" type={type} size={size} class="om-dropdown__caret-button">
          <i class="om-dropdown__icon om-icon-caret-bottom"></i>
        </om-button>
      </om-button-group>);

    return (
      <div class="om-dropdown" v-clickoutside={hide}>
        {triggerOmm}
        {this.$slots.dropdown}
      </div>
    );
  }
};
</script>
