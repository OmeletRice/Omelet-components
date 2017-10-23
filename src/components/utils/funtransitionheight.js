export default function funTransitionHeight(element, time) {
  debugger
  if (typeof window.getComputedStyle === 'undefined') return

  var height = window.getComputedStyle(element).height;

  element.style.transition = 'none'

  element.style.height = 'auto'
  var targetHeight = window.getComputedStyle(element).height
  element.style.height = height
  element.offsetWidth = element.offsetWidth
  if (time) element.style.transition = 'height ' + time + 'ms'
  element.style.height = targetHeight
}
