
// 第三方依赖
// import OmColorPicker from './components/color-picker/index.js'
// import OmCropper from './components/cropper/cropper'
// import OmDragList from './components/drag-list/drag'
import OmDialog from './components/dialog/index.js'
import OmDropdown from './components/dropdown/index.js'
import OmDropdownMenu from './components/dropdown-menu/index.js'
import OmDropdownItem from './components/dropdown-item/index.js'
import OmInputChangebox from './components/input-changebox/input-changebox'
// import OmScrollBar from './components/scrollbar/main'
// import OmSelect from './components/select/select'
// import OmSelectDropdown from './components/select/select-dropdown'
// import OmOption from './components/select/option'
// import OmSlider from './components/slider/slider'
// import OmSteps from './components/steps/steps'
// import OmStep from './components/steps/step'
// import OmSwitch from './components/switch/switch'
// import OmTag from './components/tag/tag'
// import OmTab from './components/tab/tabs'
// import OmTabPane from './components/tab/tab-pane'
// import OmTooltip from './components/tooltip/tooltip'
// import OmNotification from 'basis/notification/main.js'
// import OmTinymce from './components/tinymce/tinymce'
// import OmProgress from './components/progress/progress'
// import OmUpload from './components/upload/index'
// import OmLoading from './components/loading/install.js'
// import OmPopover from './components/popover/index.js'
// import OmMenu from './components/menu/menu'
// import OmSubmenu from './components/menu/submenu'
// import OmMenuItem from './components/menu/menu-item'
// import OmMenuItemGroup from './components/menu/menu-item-group'

// import OmPagination from './components/pagination/pagination.js'
// import OmMessageBox from './components/message-box/main.js'
// import OmInfiniteLoading from './components/infinite-loading/infinite-loading'

// basic layout
import OmRow from './packages/layout/row'
import OmCol from './packages/layout/col'
import OmButton from './packages/button'
import OmButtonGroup from './packages/button-group'
// form
import OmRadio from './packages/radio'
import OmRadioGroup from './packages/radio-group'
import OmRadioButton from './packages/radio-button'
import OmCheckbox from './packages/checkbox'
import OmCheckboxGroup from './packages/checkbox-group'
import OmInput from './packages/input'
import OmTextarea from './packages/textarea'
import OmInputNumber from './packages/input-number'

const components = [
  OmRow,
  OmCol,
  OmButton,
  OmButtonGroup,
  OmRadio,
  OmRadioGroup,
  OmRadioButton,
  OmCheckbox,
  OmCheckboxGroup,
  OmInput,
  OmTextarea,
  OmInputNumber,

  OmDialog,
  OmDropdown,
  OmDropdownMenu,
  OmDropdownItem,

  OmInputChangebox
]

const install = function (Vue, opts = {}) {
  if (install.installed) return;
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  // Vue.use(OmLoading.directive);
  // Vue.prototype.$loading = OmLoading.service
  // Vue.prototype.$notify = OmNotification
  // Vue.prototype.$msgbox = OmMessageBox;
  // Vue.prototype.$alert = OmMessageBox.alert;
  // Vue.prototype.$confirm = OmMessageBox.confirm;
  // Vue.prototype.$prompt = OmMessageBox.prompt;
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

module.exports = {
  version: '0.0.1',
  install,
  OmRow,
  OmCol,
  OmButton,
  OmButtonGroup,
  OmRadio,
  OmRadioGroup,
  OmRadioButton,
  OmCheckbox,
  OmCheckboxGroup,
  OmInput,
  OmTextarea,
  OmInputNumber,

  OmDialog,
  OmDropdown,
  OmDropdownMenu,
  OmDropdownItem,

  OmInputChangebox
}
