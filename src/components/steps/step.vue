<template>
  <div class="om-step is-flat">
    <div :class="['om-step__main', 'is-'+ curStatus ]">
      <div class="om-step__title">
        <slot></slot>
      </div>
    </div>
    <div class="om-step__body">
      <div class="om-step__connect">
        <div class="om-icon-arrow-right"></div>
      </div>
      <span class="om-step__icon"></span>
    </div>
  </div>
</template>


<script>
export default {
  name: 'OmStep',

  props: {
    title: String,
    status: String
  },

  data() {
    return {
      index: -1,
      innerStatus: null
    }
  },

  watch: {
    // '$parent.active'(val) {
    //     this.updateStatus(val);
    // }
  },

  computed: {
    curStatus() {
      return this.status || this.innerStatus;
    }
  },

  methods: {
    updateStatus(val) {
      const idx = this.index;
      if (idx < val) {
        this.innerStatus = 'finished';
      } else if (idx === val) {
        this.innerStatus = 'processing';
      } else if (idx > val) {
        this.innerStatus = 'wait';
      }
    }
  },

  beforeCreate() {
    this.$parent.steps.push(this)
  },

  mounted() {
    // const parent = this.$parent;
    const unwatch = this.$watch('index', val => {
      this.$watch('$parent.active', this.updateStatus, { immediate: true });
      unwatch();
    });
  }
}
</script>
