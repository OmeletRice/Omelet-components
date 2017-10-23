<template>
  <transition-group tag="ul" :class="[
              'om-upload-list',
              'om-upload-list--' + listType,
              { 'is-disabled': disabled }
            ]" name="om-list">
    <li v-for="(file, index) in files" :class="['om-upload-list__item', 'is-' + file.status]" :key="index">
      <div class="om-upload-list__item-thumbnail-wrap">
        <!-- <div v-lazy:background-image="imageLazyObj(file.src)" class="om-upload-list__item-thumbnail" v-if="file.status !== 'uploading' && ['picture-card', 'picture'].indexOf(listType) > -1"></div> -->
        <img v-lazy="imageLazyObj(file.src)" class="om-upload-list__item-thumbnail" v-if="file.status !== 'uploading' && ['picture-card', 'picture'].indexOf(listType) > -1" alt="">
      </div>
      <a class="om-upload-list__item-name" @click="handleClick(file)">
        <i class="om-icon-document"></i>{{file.name}}
      </a>
      <label class="om-upload-list__item-status-label" v-show="showStatus">
        <i :class="[{
                  'om-icon-upload-success': true,
                  'om-icon-circle-check': listType === 'text',
                  'om-icon-check': ['picture-card', 'picture'].indexOf(listType) > -1
                }, 'om-icon']"></i>
      </label>
      <i class="om-icon-close" v-if="!disabled" @click="$emit('remove', file)"></i>
      <om-progress v-if="file.status === 'uploading'" :width="70" :type="listType === 'picture-card' ? 'circle' : 'line'" :stroke-width="listType === 'picture-card' ? 6 : 2" :percentage="parsePercentage(file.percentage)">
      </om-progress>
      <span class="om-upload-list__item-actions" v-if="listType === 'picture-card'">
        <span class="om-upload-list__item-select" v-if="handleItemSelect && listType === 'picture-card'" @click="handleItemSelect(file)">
          <i class="om-icon om-icon-roundadd"></i>
        </span>
        <span class="om-upload-list__item-preview" v-if="handlePreview && listType === 'picture-card'" @click="handlePreview(file)">
          <i class="om-icon om-icon-browse"></i>
        </span>
        <span v-if="!disabled" class="om-upload-list__item-delete" @click="$emit('remove', file, '', true)">
          <i class="om-icon om-icon-empty"></i>
        </span>
      </span>
    </li>
  </transition-group>
</template>
<script>
import OmProgress from '../progress/progress';

export default {

  components: { OmProgress },

  data() {
    return {
      // lazyOptions: this.$editor.options.lazyOptions
    }
  },

  props: {
    files: {
      type: Array,
      default() {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    handlePreview: Function,
    handleSelect: Function,
    listType: String,
    showStatus: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    parsePercentage(val) {
      return parseInt(val, 10);
    },
    handleItemSelect(file) {
      this.handleSelect && this.handleSelect(file)
    },
    handleClick(file) {
      this.handlePreview && this.handlePreview(file);
    },
    imageLazyObj(imgSrc) {
      return {
        src: imgSrc
        // error: this.lazyOptions.error,
        // loading: this.lazyOptions.loading
      }
    }
  }
};
</script>
