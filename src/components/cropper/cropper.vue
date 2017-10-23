<template>
  <div class="om-cropper" :style="containerStyle" v-loading="isloading">
    <!-- <img ref="img" :src="src" :alt="alt" :style="[{maxWidth: '100%'}, imgStyle]"> -->
    <img ref="img" :src="src" :alt="alt" :style="[{maxWidth: '100%'}, imgStyle]" crossorigin="anonymous">
    <!-- <lazy-component @show="handlerShowImgCropper">
          <img ref="img" :src="src" :alt="alt" :style="[{maxWidth: '100%'}, imgStyle]"> {{ imgStyle }}
        </lazy-component> -->
  </div>
</template>

<script>
import Cropper from 'cropperjs';
export default {
  inheritAttrs: false,
  name: 'OmCropper',

  data() {
    return {
      cropper: null,
      isloading: true
    }
  },

  props: {
    containerStyle: Object,
    data: Object,
    preview: [String, Element],
    src: {
      type: String,
      default: ''
    },
    alt: String,
    imgStyle: Object,
    dragMode: String,
    responsive: {
      type: Boolean,
      default: true
    },
    restore: {
      type: Boolean,
      default: true
    },
    checkCrossOrigin: {
      type: Boolean,
      default: true
    },
    checkOrientation: {
      type: Boolean,
      default: true
    },
    cropBoxMovable: {
      type: Boolean,
      default: true
    },
    cropBoxResizable: {
      type: Boolean,
      default: true
    },
    toggleDragModeOnDblclick: {
      type: Boolean,
      default: true
    },
    modal: {
      type: Boolean,
      default: true
    },
    center: {
      type: Boolean,
      default: true
    },
    highlight: {
      type: Boolean,
      default: true
    },
    zoomOnTouch: {
      type: Boolean,
      default: true
    },
    zoomOnWheel: {
      type: Boolean,
      default: true
    },
    scalable: {
      type: Boolean,
      default: true
    },
    zoomable: {
      type: Boolean,
      default: true
    },
    guides: {
      type: Boolean,
      default: true
    },
    background: {
      type: Boolean,
      default: true
    },
    autoCrop: {
      type: Boolean,
      default: true
    },
    movable: {
      type: Boolean,
      default: true
    },
    rotatable: {
      type: Boolean,
      default: true
    },
    viewMode: Number,
    aspectRatio: Number,
    autoCropArea: Number,
    wheelZoomRatio: Number,

    // Size limitation
    minCanvasWidth: Number,
    minCanvasHeight: Number,
    minCropBoxWidth: Number,
    minCropBoxHeight: Number,
    minContainerWidth: Number,
    minContainerHeight: Number,

    // callbacks
    ready: Function,
    cropstart: Function,
    cropmove: Function,
    cropend: Function,
    crop: Function,
    zoom: Function
  },

  methods: {
    reset() {
      return this.cropper.reset();
    },
    clear() {
      return this.cropper.clear();
    },
    replace(url, onlyColorChanged) {
      return this.cropper.replace(url, onlyColorChanged);
    },
    enable() {
      return this.cropper.enable();
    },
    disable() {
      return this.cropper.disable();
    },
    destroy() {
      return this.cropper.destroy();
    },
    move(offsetX, offsetY) {
      return this.cropper.move(offsetX, offsetY);
    },
    moveTo(x, y) {
      return this.cropper.moveTo(x, y);
    },
    relativeZoom(ratio, _originalEvent) {
      return this.cropper.zoom(ratio, _originalEvent);
    },
    zoomTo(ratio, _originalEvent) {
      return this.cropper.zoomTo(ratio, _originalEvent);
    },
    rotate(degree) {
      return this.cropper.rotate(degree);
    },
    rotateTo(degree) {
      return this.cropper.rotateTo(degree);
    },
    scale(scaleX, scaleY) {
      return this.cropper.scale(scaleX, scaleY);
    },
    scaleX(_scaleX) {
      return this.cropper.scaleX(_scaleX);
    },
    scaleY(_scaleY) {
      return this.cropper.scaleY(_scaleY);
    },
    getData(rounded) {
      return this.cropper.getData(rounded);
    },
    setData(data) {
      return this.cropper.setData(data);
    },
    getContainerData() {
      return this.cropper.getContainerData();
    },
    getImageData() {
      return this.cropper.getImageData();
    },
    getCanvasData() {
      return this.cropper.getCanvasData();
    },
    setCanvasData(data) {
      return this.cropper.setCanvasData(data);
    },
    getCropBoxData() {
      return this.cropper.getCropBoxData();
    },
    setCropBoxData(data) {
      return this.cropper.setCropBoxData(data);
    },
    getCroppedCanvas(options) {
      return this.cropper.getCroppedCanvas(options);
    },
    setAspectRatio(aspectRatio) {
      return this.cropper.setAspectRatio(aspectRatio);
    },
    setDragMode(mode) {
      return this.cropper.setDragMode(mode);
    },
    updateCropper(options) {
      const { ...data } = this.$props;
      const props = {};
      for (const key in data) {
        if (this[key] !== undefined) {
          props[key] = data[key] || this[key]
        }
      }
      if (options) {
        for (const key in options) {
          props[key] = options[key]
        }
      }
      this.cropper = new Cropper(this.$refs.img, props)
    }
  },
  mounted() {
    this.updateCropper()
    this.$parent.cropper = this
    setTimeout(() => {
      this.isloading = false
      if (this.$parent.handleImageMax) {
        this.$parent.handleImageMax()
      }
    }, 500)
    if (this.$parent.handleImageMax) {
      this.$parent.handleImageMax()
    }
  },
  beforeDestroy() {
    this.destroy()
  }
}
</script>

<style>
  @import './cropper.css';
</style>
