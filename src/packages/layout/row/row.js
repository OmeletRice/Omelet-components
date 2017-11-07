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

  render(h) {
    let style = {}

    if (this.gutter) {
      style.marginLeft = `-${this.gutter / 2}px`
      style.marginRight = `-${this.gutter / 2}px`
    }

    return h(
      this.tag,
      {
        class: [
          'om-row'
        ],
        style: style
      },
      this.$slots.default
    )
  }
}
