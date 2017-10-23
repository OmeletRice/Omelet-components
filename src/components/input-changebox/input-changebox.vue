<template>
  <div class="om-input-changebox">
    <om-input class="om-input-changebox__input" size="small" ref="input" :disabled="disabled" :class="isEditing ? 'is-editing' : ''" :value="value" @focus="isEditing = true" @blur="handleBlur" @change="handleChange">
      <span v-if="icon" slot="icon" class="om-input-changebox__input-icon" @click.stop="handleIconClick">
        <i class="om-icon om-icon-storage-pencil"></i>
      </span>
    </om-input>
    <div class="om-input-changebox__btn" v-if="checkBtn" v-show="isEditing">
      <span class="om-input-changebox__btn-cancel" @click.stop="handleCancel">
        <i class="om-icon om-icon-roundclose"></i>
      </span>
      <span class="om-input-changebox__btn-confirm" @click.stop="handleConfirm">
        <i class="om-icon om-icon-roundcheck"></i>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OmInputChangebox',

  props: {
    value: String,
    isValidChange: {
      type: Function,
      default: (err) => { return err }
    },
    icon: String,
    checkBtn: Boolean,
    disabled: false
  },

  data() {
    return {
      isEditing: false,
      val: this.value
    }
  },

  watch: {
    value(value) {
      this.val = value
    }
  },

  methods: {
    handleChange(val) {
      this.val = val
      this.$emit('change', val)
    },
    handleIconClick() {
      this.isEditing = true
    },
    handleBlur() {
      this.isEditing = false
      this.handleConfirm()
    },
    handleCancel() {
      this.isEditing = false
      // console.log('cancel')
    },
    handleConfirm() {
      // const isValidChange = this.isValidChange(this.val)
      // if (isValidChange === true) {
      this.isEditing = false
      this.$emit('changed', this.val)
      // } else {
      //   const err = isValidChange
      //   this.$notify.error({
      //     message: 'this is err: ' + err
      //   })
      // }
    }
  },

  mounted() {
    this.val = this.value
  }
}
</script>
