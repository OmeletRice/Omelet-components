import Vue from 'vue'
import OmButton from './button/button'
import OmButtonGroup from './button/button-group'
// import OmColorPicker from './color-picker/color-picker'
// import OmDialog from './dialog/dialog'
// import OmDropdown from './dropdown/dropdown'
// import OmDropdownMenu from './dropdown/dropdown-menu'
// import mpDropdownItem from './dropdown/dropdown-item'
// import OmInput from './input/input'
// import OmInputNumber from './input-number/input-number'
// import OmInputChangebox from './input-changebox/input-changebox'
// import OmRadioButton from './radio/radio-button'
// import OmRadioGroup from './radio/radio-group'
// import OmScrollBar from './scrollbar/main'
// import OmSelect from './select/select'
// import OmSelectDropdown from './select/select-dropdown'
// import OmOption from './select/option'
// import OmSlider from './slider/slider'
// import OmSteps from './steps/steps'
// import OmStep from './steps/step'
// import OmSwitch from './switch/switch'
// import OmTag from './tag/tag'
// import OmTab from './tab/tabs'
// import OmTabPane from './tab/tab-pane'
// import OmTooltip from './tooltip/tooltip'
// import OmNotification from 'basis/notification/main.js'
// import OmTinymce from './tinymce/tinymce'
// import OmProgress from './progress/progress'
// import OmUpload from './upload/index'
// import OmLoading from './loading/install.js'
// import OmPopover from './popover/index.js'
// import OmMenu from './menu/menu'
// import OmSubmenu from './menu/submenu'
// import OmMenuItem from './menu/menu-item'
// import OmMenuItemGroup from './menu/menu-item-group'
// import OmDragList from './drag-list/drag'

// import OmPagination from './pagination/pagination.js'
// import OmMessageBox from './message-box/main.js'
// import OmInfiniteLoading from './infinite-loading/infinite-loading'
// import OmCropper from './cropper/cropper'

const components = [
  OmButton,
  OmButtonGroup
  // OmColorPicker,
  // OmDragList,
  // OmDialog,
  // OmDropdown,
  // OmDropdownMenu,
  // mpDropdownItem,
  // OmInput,
  // OmInputNumber,
  // OmInputChangebox,
  // OmRadioButton,
  // OmRadioGroup,
  // OmScrollBar,
  // OmSelect,
  // OmSelectDropdown,
  // OmOption,
  // OmSlider,
  // OmSteps,
  // OmStep,
  // OmSwitch,
  // OmTag,
  // OmTab,
  // OmTabPane,
  // OmTooltip,
  // OmNotification,
  // OmTinymce,
  // OmProgress,
  // OmUpload,
  // OmPopover,
  // OmMenu,
  // OmSubmenu,
  // OmMenuItem,
  // OmMenuItemGroup,
  // OmPagination,
  // OmInfiniteLoading
  // OmCropper
]

const install = function () {
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

export default {
  install
}
