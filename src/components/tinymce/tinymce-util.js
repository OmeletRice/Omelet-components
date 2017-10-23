import _ from 'lodash'

const ELEMENTS = ['p', 'span', 'ol', 'ul', 'li'];

function standardlize(node, styles, options) {
  options = _.merge({}, {
    forceLineHeight: false
  }, options);
  let dom = null
  if (typeof node === 'string') {
    dom = document.createElement('div')
    dom.innerHTML = node
  } else {
    dom = node
  }
  traverse(dom, ELEMENTS, _n => {
    if (_n.style.fontSize === '') {
      _n.style.fontSize = styles.fontSize
    }
    _n.style.lineHeight = lineHeight(_n.style.fontSize, styles.lineHeight)
  })
  return dom.innerHTML
}

function lineHeight(fontSize, lineHeight) {
  return Math.round(parseInt(fontSize.substr(0, fontSize.length - 2)) * lineHeight) + 'px';
}

function traverse(node, tags, fn) {
  if (node.nodeType === 1) {
    var tagName = node.tagName.toLowerCase()
    if (tags.indexOf(tagName) >= 0) {
      fn(node)
    }
    const child = node.children
    if (node && child && child.length !== 0) {
      for (let i = 0, len = child.length; i < len; i++) {
        traverse(node.children[i], tags, fn)
      }
    }
  }
}

export default {
  standardlize: standardlize
}
