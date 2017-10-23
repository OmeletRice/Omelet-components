<template>
  <div draggable="false" :class="['om-tinymce-wrap', isDisable ? 'is-disable': '']" ref="tinymceWrap" @drag.prevent="handleDrag" @dragstart.prevent="handleDrag">
  </div>
</template>

<script>
import _ from 'lodash'
import tinymce from './tinymce/tinymce.min.js'
// import tinymce from 'tinymce'
import tinyUtil from './tinymce-util.js'
export default {
  name: 'OmTinymce',

  props: {
    toolbar: String,
    isDisable: {
      type: Boolean,
      default: false
    },
    options: Object,
    content: {
      type: String,
      default: ''
    },
    value: String,
    lineHeight: Number,
    fontSize: String
  },

  computed: {
    extraStyles() {
      return {
        fontSize: this.fontSize,
        lineHeight: this.lineHeight
      }
    }
  },

  data() {
    return {
      editor: null,
      beforeFocusContent: null,
      editActionStack: [],
      editorState: this.$editor.state
    }
  },

  methods: {
    parent(vm) {
      let result = vm.$parent;
      while (!result.editorVm) {
        result = result.$parent;
      }
      return result;
    },
    getContent() {
      return this.editor.getContent()
    },
    standardlize(curcontent) {
      const content = tinyUtil.standardlize(curcontent, this.extraStyles);
      return content;
    },
    createTinymce() {
      var self = this

      // Default configuration
      tinymce.baseURL = this.options.baseURL || 'static/tinymce'

      let customOptions = this.options
      if (!customOptions) customOptions = {}

      const body_id = customOptions.body_id || ''

      const font_formats = customOptions.font_formats || '宋体=SimSun, 宋体;黑体=SimHei, 黑体;楷体=KaiTi, 楷体;幼圆=YouYuan, 幼圆;微软雅黑=Microsoft YaHei, 微软雅黑;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Times New Roman=times new roman,times;Verdana=verdana,geneva;'

      const toolbar = customOptions.toolbar || 'undo redo | bold italic underline forecolor | fontselect | fontsizeselect | link | alignleft aligncenter alignright'

      const link_context_toolbar = !!customOptions.link_context_toolbar

      // Initial configuration
      let options = {
        // selector: '.om-tinymce-wrap',
        target: this.$refs.tinymceWrap,
        body_id: body_id,
        // fixed_toolbar_container: '',
        // event_root: '.om-tinymce-wrap',
        theme: 'modern',
        inline: true,
        language: this.$editor.vm.$i18n.locale,
        branding: false,
        // min_height: 100,
        resize: true,
        skin_url: tinymce.baseURL + '/skins/mptiny',
        preview_styles: true,
        formats: {
          bold: { inline: 'span', styles: { fontWeight: 'bold' } },
          italic: { inline: 'span', styles: { fontStyle: 'italic' } }
        },
        relative_urls: false,
        convert_urls: false,
        menu: {},
        // content_style: 'p,span { fontsize:' + self.fontSize + ' }',
        plugins: 'textcolor colorpicker lists advlist link textpattern',
        toolbar: toolbar,
        // plugins : 'advlist autolink link image lists charmap print preview'
        // toolbar: 'lineheightselect backcolor'

        fontsize_formats: '8px 9px 10px 12px 14px 16px 18px 20px 22px 24px 26px 28px 36px 48px 72px',
        font_formats: font_formats,

        // link
        default_link_target: "_blank",
        link_context_toolbar: link_context_toolbar,

        // list
        lists_indent_on_tab: true,
        advlist_bullet_styles: "square circle disc",
        advlist_number_styles: "default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman",

        // letter-spacing
        letterspacing_formats: '0px 1px 2px 3px 4px 5px'
      }

      if (!_.isUndefined(this.toolbar)) {
        options.fixed_toolbar_container = this.toolbar;
      }

      let setup = function(editor) {
        editor.on('MouseEnter', function() {
          self.handleIsEditing('enter')
        })
        editor.on('MouseOut', function() {
          self.handleIsEditing('leave')
        })
        editor.on('MouseDown', function() {
          self.handleIsEditing('start')
        })
        editor.on('MouseUp', function() {
          self.handleIsEditing('end')
        })
        editor.on('Change', function(e) {
          self.$emit('change')
          if (e.originalEvent) {
            if (e.originalEvent.command === 'InsertUnorderedList' || e.originalEvent.command === 'InsertOrderedList') {
              tinyUtil.standardlize(editor.selection.getNode(), self.extraStyles)
            }
            if (e.originalEvent.command === 'FontSize') {
              // Add line-height to target elment style
              tinyUtil.standardlize(editor.selection.getNode(), self.extraStyles)
            }
          }
        })
        editor.on('KeyUp', function(e) {
          self.$emit('change')
          if (e.key === 'Backspace' && self.getContent() === '') {
            this.setContent('<br>')
            tinyUtil.standardlize(editor.selection.getNode(), self.extraStyles)
          }
        })
        editor.on('Focus', function() {
          self.$emit('focus');
          const contents = this.getContent()
          self.beforeFocusContent = contents
          if (self.$parent.position) {
            self.$editor.contents.selectComponent(self.$parent.position)
          }
        })
        editor.on('Blur', function() {
          const contents = self.standardlize(this.getContent())
          if (self.beforeFocusContent !== contents) {
            // console.log('blur -> changed', contents)
            self.emitToParent(contents)
            self.beforeFocusContent = contents
          }
        })
        editor.on('init', function() {
          self.editor = this;
          if (self.parent(self)) {
            self.parent(self).editorVm = this
          }
          editor.formatter.register({
            letterspacing: {
              inline: 'span',
              styles: {
                'letter-spacing': '%value'
              }
            }
          });
        })

        if (self.options.toolbar.some(o => o.indexOf('merge_tag') >= 0)) {
          editor.addButton('merge_tag', {
            type: 'menubutton',
            text: self.$t('control.tinymce.merge_tag'),
            icon: false,
            menu: self.$editor.options.mergeTags.map(o => {
              return {
                text: o.text,
                onclick: function() {
                  editor.insertContent('&nbsp;&nbsp;<span>' + o.value + '</span>&nbsp;&nbsp;')
                }
              }
            })
          });
        }

        if (self.options.toolbar.some(o => o.indexOf('special_link') >= 0)) {
          function mapLink(o) {
            if (o.type === 'select') {
              return {
                text: o.text,
                menu: o.items.map(mapLink)
              };
            }
            else {
              return {
                text: o.text,
                onclick: function() {
                  var rng = editor.selection.getRng()
                  if (rng.startOffset === rng.endOffset) {
                    editor.insertContent('&nbsp;<a href="' + o.value + '" target="_blank" title="' + o.text + '" > ' + o.text + ' </a>&nbsp;')
                  } else {
                    var linkAttrs = {
                      href: o.value,
                      title: o.text || null
                    };
                    editor.execCommand('mceInsertLink', false, linkAttrs);
                  }
                }
              }
            }
          }
          editor.addButton('special_link', {
            type: 'menubutton',
            text: self.$t('control.tinymce.special_link'),
            icon: false,
            menu: self.$editor.options.specialLinks.map(mapLink)
          });
        }

        if (self.options.toolbar.some(o => o.indexOf('letter_spacing') >= 0)) {
          editor.addButton('letter_spacing', () => {
            var items = [];
            var letterspacing_formats = options.letterspacing_formats
            letterspacing_formats.split(' ').forEach(function(item) {
              var text = item
              var value = item
              var values = item.split('=')
              if (values.length > 1) {
                text = values[0]
                value = values[1]
              }
              items.push({
                text: text,
                value: value
              });
            });
            return {
              type: 'listbox',
              text: self.$t('control.tinymce.letter_spacing'),
              tooltip: self.$t('control.tinymce.letter_spacing'),
              values: items,
              fixedWidth: true,
              onPostRender: function() {
                var self = this;
                editor.on('init', function(e) {
                  const formatName = 'letterspacing'
                  const formatter = editor.formatter
                  var value = null
                  e.parents.forEach(function(node) {
                    items.forEach(function(item) {
                      if (formatName) {
                        if (formatter.matchNode(node, formatName, {
                          value: item.value
                        })) {
                          value = item.value
                        }
                      } else {
                        if (formatter.matchNode(node, item.value)) {
                          value = item.value
                        }
                      }
                      if (value) return false
                    })
                    if (value) return false
                  })
                  this.value(value)
                });
              },
              onselect: function(e) {
                editor.formatter.apply('letterspacing', {
                  value: this.value()
                })
                editor.execCommand('mceSetContent', false, self.getContent())
              }
            }
          })
        }
      }

      options.setup = setup
      tinymce.init(options);
    },
    emitToParent(content) {
      content = content || this.getContent()
      this.$emit('changed', content)
    },
    handleDrag() {
      return false
    },
    handleIsEditing(action) {
      const stack = this.editActionStack
      if (stack.length === 0) this.editorState.disableSelect = false
      if (action === 'enter' && stack[stack.length - 1] !== 'start') return
      if (action === 'leave' && stack[stack.length - 1] !== 'start') return
      this.editActionStack.push(action)
      // console.log(this.editActionStack)
      if (action === 'start') {
        if (stack.length !== 1) {
          this.editActionStack = [stack[stack.length - 1]]
        }
        this.editorState.disableSelect = true
      }
      const leaveIdx = stack.indexOf('leave')
      if (leaveIdx !== -1) this.editorState.disableSelect = !(stack[this.leaveIdx - 1] === 'start')
      if (action === 'end' && stack[stack.length - 1] !== 'start') {
        this.editActionStack = []
        this.editorState.disableSelect = false
      }
      // console.log(this.editorState.disableSelect)
    },
    hide() {
      this.editor.hide()
      this.editor.show()
    }
  },
  watch: {
    lineHeight(val) {
      const content = this.standardlize(this.content);
      this.editor.setContent(content);
      this.$emit('cascade', content);
    },
    content(val) {
      this.editor.setContent(val)
    }
  },

  mounted() {
    this.$refs.tinymceWrap.innerHTML = this.content;
  },

  beforeDestroy() {
    tinymce.execCommand('mceRemoveEditor', false)
    this.editor.destroy()    
  }
}
</script>
