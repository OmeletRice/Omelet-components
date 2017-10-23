<template>
  <div :class="[ 'om-color-picker', size ? 'om-color-picker--' + size : '' ]">
    <div :class="['om-color-picker__trigger', fc_dropdown.focus ? 'is-show':'']">
      <!-- <i :class="['om-color-picker__icon om-icon om-icon-caret-top', showPicker ? 'is-reverse':'']" @click.stop="handleClick"></i> 别删 -->
      <span class="om-color-picker__color" :class="{ 'is-alpha': showAlpha }" @click="handleClick">
        <span class="om-color-picker__color-inner" :style="bgColorStyle"></span>
      </span>
      <input class="om-color-picker__input" v-model="displayColor" @focus="handleInputFocus" @input.stop="handleInput" @change.stop="handleInputChanged" />
    </div>
    <picker-dropdown :enter-color="fc_dropdown.enterValue || value" ref="dropdown" v-model="fc_dropdown.focus" class="om-color-picker__panel" :color-list="colorList" :colors="value" :show-alpha="showAlpha" @change="handleColorChange" @changed="handleColorChanged">
    </picker-dropdown>
  </div>
</template>

<script>
import PickerDropdown from './picker-dropdown.vue';
import FocusControl from '../utils/FocusControl'
import tinycolor from 'tinycolor2'
export default {
  name: 'OmColorPicker',

  props: {
    value: {
      type: [Object, String]
    },
    showAlpha: {
      type: Boolean
    },
    colorList: {
      type: Array
    },
    size: String
  },

  data() {
    const self = this;
    return {
      displayColor: this.value,
      oldDisplayColor: this.value,
      fc_dropdown: new FocusControl(
        () => self.$refs.dropdown.$el,
        v => {
          self.leave(v);
        }
      )
    }
  },

  watch: {
    value(value) {
      this.displayColor = value
    }
  },

  methods: {
    handleColorChange(newColor) {
      this.$emit('change', this.formatDisplayColor(newColor))
      this.displayColor = this.formatDisplayColor(newColor)
    },
    handleColorChanged(newColor) {
      this.$emit('changed', this.formatDisplayColor(newColor))
      this.displayColor = this.formatDisplayColor(newColor)
    },
    formatDisplayColor(color) {
      const _color = tinycolor(color)
      if (!this.showAlpha) {
        if (_color.getAlpha() === 0) {
          return 'transparent'
        } else {
          return color.hex
        }
      } else {
        return color
      }
    },
    handleInputFocus() {
      this.oldDisplayColor = this.displayColor;
    },
    handleInputChanged() {
      if (this.isValidColor(this.displayColor)) {
        this.$refs.dropdown.$refs.chrome.colorChange(this.displayColor)
        this.$emit('changed', this.formatDisplayColor(this.$refs.dropdown.$refs.chrome.colors))
        this.leave(this.oldDisplayColor);
      } else {
        this.$refs.dropdown.$refs.chrome.colorChange(this.oldDisplayColor)
      }
    },
    handleInput() {
      if (this.displayColor) {
        this.$emit('changed', this.displayColor)
      }
    },
    handleClick() {
      if (!this.fc_dropdown.focus) {
        this.fc_dropdown.hook(this.displayColor);
        this.$emit('enter', this.displayColor);
      }
    },
    isValidColor(hex) {
      const color = tinycolor(hex)
      return color.isValid()
    },
    areaElements() {
      return this.fc_dropdown.focus ? [this.$refs.dropdown.$el] : [];
    },
    leave(oldValue) {
      this.$emit('leave', this.displayColor, oldValue)
    }
  },

  computed: {
    bgColorStyle() {
      const transparentColor = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMElEQVQ4T2N89uzZfwY8QFJSEp80A+OoAcMiDP7//483HTx//hx/Ohg1gIFx6IcBALl+VXknOCvFAAAAAElFTkSuQmCC) left center'
      if (this.displayColor === 'transparent') {
        return `background: ${transparentColor}`
      } else {
        return `background: ${this.displayColor}`
      }
    }
  },

  components: {
    PickerDropdown
  },

  mounted() {
    this.popperElm = this.$refs.dropdown.$el;
  }
};
</script>
