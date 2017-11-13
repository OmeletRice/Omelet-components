<template>
  <div>
    <h2>Checkbox</h2>
    <h3>Props: label value disabled name customClass</h3>
    <h3>Event: change</h3>
    <div class="porp-style-select">
      <div class="porp-style-selete-item">
        <!-- <span>disabled:</span>
        <label v-for="s in disableds" :key="s">
          <input type="radio" name="disabled" :value="s" @click.stop="handle(s, 'disabled')"> {{ s }}
        </label> -->
      </div>
    </div>
    <div class="prop-style-preview">
      <p>没有 label 值，返回 true/false</p>
      <om-checkbox 
        v-model="value0" 
        @change="handleChange0">index0: {{value_0}}</om-checkbox>

      <p>如果没有 Group 且带有 label， 选中返回label， 不选中返回 null</p>
      <om-checkbox 
        v-model="value1" 
        :label="2"
        @change="handleChange1">index1: {{ value_1 }}</om-checkbox>

      <p>如果没有 Group 且带有 true-label 或者 false-label, 选中返回 true-label 不选中返回 false-label, label 无效</p>
      <om-checkbox 
        v-model="value2" 
        :label="2"
        :true-label="22"
        :false-label="33"
        @change="handleChange2">index2: {{ value_2 }}</om-checkbox>
      
    </div>
    <!--  -->
    <h2>Checkbox</h2>
    <h3>Props: label value disabled name customClass</h3>
    <h3>Event: change</h3>
    <div class="porp-style-select">
      <div class="porp-style-selete-item">
        <!-- <span>disabled:</span>
        <label v-for="s in disableds" :key="s">
          <input type="radio" name="disabled" :value="s" @click.stop="handle(s, 'disabled')"> {{ s }}
        </label> -->
      </div>
    </div>
    <div class="prop-style-preview">
      <om-checkbox-group v-model="gvalue0" @change="handleChangeg0">
        <om-checkbox :label="1">index-1</om-checkbox>
        <om-checkbox :label="2" disabled>index-2</om-checkbox>
        <om-checkbox :label="3">index-3</om-checkbox>
        <om-checkbox :label="4" disabled>index-4</om-checkbox>
      </om-checkbox-group>
      <p>{{gvalue0}}</p>
      min = 2, max = 4
      <om-checkbox-group v-model="gvalue0" :min="2" :max="4" @change="handleChangeg0">
        <om-checkbox :label="1">index-1</om-checkbox>
        <om-checkbox :label="2">index-2</om-checkbox>
        <om-checkbox :label="3">index-3</om-checkbox>
        <om-checkbox :label="4">index-4</om-checkbox>
        <om-checkbox :label="5">index-5</om-checkbox>
        <om-checkbox :label="6">index-6</om-checkbox>
      </om-checkbox-group>
      <p>{{gvalue0}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value0: true,
      value_0: '',
      value1: 1,
      value_1: '',
      value2: 22,
      value_2: '',

      gvalue0: [1, 2]
    }
  },

  methods: {
    handle(s, t) {
      this[t] = s
    },
    handleChange0(val) {
      this.value_0 = val
    },
    handleChange1(val) {
      this.value_1 = val
    },
    handleChange2(val) {
      this.value_2 = val
    },
    handleChangeg0(val) {
      console.log(val)
    }
  }
}
</script>

<style>
.porp-style-select,
.prop-style-preview {
  width: 40%;
  display: inline-block;
  border: 1px solid black;
  padding: 10px 5px;
  vertical-align: top
}

.porp-style-select {
  text-align: left
}
</style>
