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

    push: Number,

    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
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
    });

    ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
      const type = typeof this[size]
      if (type === 'number') {
        classList.push(
          `om-col-${size}-${this[size]}`
        )
      } else if (type === 'object') {
        let o = this[size]
        Object.keys(o).forEach((prop) => {
          classList.push(
            prop !== 'span' ? `om-col-${size}-${prop}-${o.prop}` : `om-col-${o[prop]}`
          )
        })
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
