export function clearSelections () {
  if (window.getSelector || window.getSelection) {
    // 获取选中
    var selection = window.getSelection();
    // 清除选中
    selection.removeAllRanges();
  } else if (document.selection && document.selection.empty) {
    // 兼容 IE8 以下，但 IE9+ 以上同样可用
    document.selection.empty();
    // 或使用 clear() 方法
    // document.selection.clear();
  }
}
