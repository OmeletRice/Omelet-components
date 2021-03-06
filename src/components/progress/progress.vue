<template>
  <div class="om-progress" :class="[
          'om-progress--' + type,
          status ? 'is-' + status : '',
          {
            'om-progress--without-text': !showText,
            'om-progress--text-inside': textInside,
          }
        ]">
    <div class="om-progress-bar" v-if="type === 'line'">
      <div class="om-progress-bar__outer" :style="{height: strokeWidth + 'px'}">
        <div class="om-progress-bar__inner" :style="barStyle">
          <div class="om-progress-bar__innerText" v-if="showText && textInside">{{percentage}}%</div>
        </div>
      </div>
    </div>
    <div class="om-progress-circle" :style="{height: width + 'px', width: width + 'px'}" v-else>
      <svg viewBox="0 0 100 100">
        <path class="om-progress-circle__track" :d="trackPath" stroke="#e5e9f2" :stroke-width="relativeStrokeWidth" fill="none"></path>
        <path class="om-progress-circle__path" :d="trackPath" stroke-linecap="round" :stroke="stroke" :stroke-width="relativeStrokeWidth" fill="none" :style="circlePathStyle"></path>
      </svg>
    </div>
    <div class="om-progress__text" v-if="showText && !textInside" :style="{fontSize: progressTextSize + 'px'}">
      <template v-if="!status">{{percentage}}%</template>
      <i v-else :class="iconClass"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OmProgress',
  props: {
    type: {
      type: String,
      default: 'line',
      validator: val => ['line', 'circle'].indexOf(val) > -1
    },
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: val => val >= 0 && val <= 100
    },
    status: {
      type: String
    },
    strokeWidth: {
      type: Number,
      default: 6
    },
    textInside: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 126
    },
    showText: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    barStyle() {
      var style = {};
      style.width = this.percentage + '%';
      return style;
    },
    relativeStrokeWidth() {
      return (this.strokeWidth / this.width * 100).toFixed(1);
    },
    trackPath() {
      var radius = parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10);

      return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`;
    },
    perimeter() {
      var radius = 50 - parseFloat(this.relativeStrokeWidth) / 2;
      return 2 * Math.PI * radius;
    },
    circlePathStyle() {
      var perimeter = this.perimeter;
      return {
        strokeDasharray: `${perimeter}px,${perimeter}px`,
        strokeDashoffset: (1 - this.percentage / 100) * perimeter + 'px',
        transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
      };
    },
    stroke() {
      var ret;
      switch (this.status) {
        case 'success':
          ret = '#13ce66';
          break;
        case 'exception':
          ret = '#ff4949';
          break;
        default:
          ret = '#00b2f0';
      }
      return ret;
    },
    iconClass() {
      if (this.type === 'line') {
        return this.status === 'success' ? 'om-icon-circle-check' : 'om-icon-circle-cross';
      } else {
        return this.status === 'success' ? 'om-icon-check' : 'om-icon-close';
      }
    },
    progressTextSize() {
      return this.type === 'line'
        ? 12 + this.strokeWidth * 0.4
        : this.width * 0.111111 + 2;
    }
  }
};
</script>
