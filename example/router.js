import Button from './button'
import ColorPicker from './color-picker'
import Dialog from './dialog'
import Dropdown from './dropdown'

const routers = [
  { path: '/button', component: Button },
  { path: '/color-picker', component: ColorPicker },
  { path: '/dialog', component: Dialog },
  { path: '/dropdown', component: Dropdown }
]

export default routers
