import Vue from 'vue'
import Popover from './popover'

const directive = {
  bind(el, binding, vnode) {
    vnode.context.$refs[binding.arg].$refs.reference = el;
  }
}

Vue.directive('popover', directive);

Popover.directive = directive

export default Popover
