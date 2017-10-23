<template>
  <div :class="['om-steps', {'is-horizontal': isHorizontal}]">
    <slot></slot>
  </div>
</template>


<script>
import OmStep from './step'
export default {
  name: 'OmSteps',

  components: {
    OmStep
  },

  props: {
    isHorizontal: {
      type: Boolean,
      default: true
    },
    processStatus: {
      type: String,
      default: 'processing'
    },
    finishedStatus: {
      type: String,
      default: 'finished'
    },
    active: Number
  },

  data() {
    return {
      steps: []
    }
  },

  mounted() {
    this.$children.forEach((item, idx) => {
      item.index = idx;
    });
  }
}
</script>
