// basic
import Button from './button'
import Color from './color'
import Layout from './layout'
// form
import Radio from './radio'
import Checkbox from './checkbox'
import Input from './input'
import Textarea from './textarea'
import InputNumber from './input-number'

import ColorPicker from './color-picker'
import Dialog from './dialog'
import Dropdown from './dropdown'
import InputChangebox from './input-changebox'

const routers = [
  { path: '/button', component: Button },
  { path: '/color', component: Color },
  { path: '/layout', component: Layout },
  { path: '/radio', component: Radio },
  { path: '/checkbox', component: Checkbox },
  { path: '/textarea', component: Textarea },
  { path: '/input-number', component: InputNumber },

  { path: '/color-picker', component: ColorPicker },
  { path: '/dialog', component: Dialog },
  { path: '/dropdown', component: Dropdown },
  { path: '/input', component: Input },
  { path: '/input-changebox', component: InputChangebox }
]

export default routers
