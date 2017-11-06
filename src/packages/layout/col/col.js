export default {
  name: 'OmCol',

  props: {
    span: {
      type: Number,
      default: 24
    },

    tag: {
      type: String,
      default: 'div'
    },

    offset: Number,

    pull: Number,

    push: Number
  },

  computed: {
    gutter() {
      let parent = this.$parent

      while (parent && parent.$options.componentName !== 'OmRow') {
        parent = this.$parent
      }

      return parent ? parent.gutter : 0
    }
  },

  render(h) {
    let classList = []
    let style = {}

    if (this.gutter) {
      style.paddingLeft = `${this.gutter / 2}px`
      style.paddingRight = `${this.gutter / 2}px`
    }

    ['span', 'offset', 'pull', 'push'].forEach(prop => {
      if (this[prop] || this[prop] === 0) {
        classList.push(
          prop !== 'span' ? `om-col-${prop}-${this[prop]}` : `om-col-${this[prop]}`
        )
      }
    })

    return h(
      this.tag,
      {
        class: [
          'om-col',
          classList
        ],
        style: style
      },
      this.$slots.default
    )
  }
}
