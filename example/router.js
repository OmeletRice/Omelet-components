import Button from './button'
import ColorPicker from './color-picker'
import Dialog from './dialog'
import Dropdown from './dropdown'
import Input from './input'
import InputChangebox from './input-changebox'
import InputNumber from './input-number'

import Layout from './layout'

const routers = [
  { path: '/layout', component: Layout },
  { path: '/button', component: Button },
  { path: '/color-picker', component: ColorPicker },
  { path: '/dialog', component: Dialog },
  { path: '/dropdown', component: Dropdown },
  { path: '/input', component: Input },
  { path: '/input-changebox', component: InputChangebox },
  { path: '/input-number', component: InputNumber }
]

export default routers
