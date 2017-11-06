export default {
  name: 'OmRow',

  componentName: 'OmRow',

  props: {
    tag: {
      type: String,
      default: 'div'
    },

    gutter: Number
  },

  computed: {
    style() {
      const ret = {}

      if (this.gutter) {
        ret.marginLeft = `-${this.gutter / 2}px`
        ret.marginRight = `-${this.gutter / 2}px`
      }

      return ret
    }
  },

  render(h) {
    return h(
      this.tag,
      {
        class: [
          'om-row'
        ],
        style: this.style
      },
      this.$slots.default
    )
  }
}
