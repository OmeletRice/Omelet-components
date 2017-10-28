import Button from './button'
import ColorPicker from './color-picker'
import Dialog from './dialog'
import Dropdown from './dropdown'
import Input from './input'

const routers = [
  { path: '/button', component: Button },
  { path: '/color-picker', component: ColorPicker },
  { path: '/dialog', component: Dialog },
  { path: '/dropdown', component: Dropdown },
  { path: '/input', component: Input }
]

export default routers
