<template>
  <div>
    <h2>Textarea</h2>
    <h3>Props: autofocus cols rows name readonly placeholder maxlength form id spellcheck label value disabled resize autosize maxsize</h3>
    <div class="porp-style-select">
      <div class="porp-style-selete-item">
        <span>resizes:</span>
        <label v-for="s in resizes" :key="s">
          <input type="radio" name="resizes" :value="s" @click.stop="handle(s, 'resize')"> {{ s }}
        </label>
      </div>
    </div>
    <div class="prop-style-preview">
      <h4>autosize: { minRows: 2, maxRows: 5 }</h4>
      <om-textarea :autosize="{minRows:2,maxRows:5}"></om-textarea>
      <h4>resize: both,none,horizontal,vertical </h4>
      <om-textarea :resize="resize"></om-textarea>
      <h4>maxsize: {maxHeight:"100px",maxWidth:"300px"}</h4>
      <om-textarea :resize="resize" :maxsize="{maxHeight:'100px',maxWidth:'300px'}"></om-textarea>
      <h4>disabled & resize="noen"</h4>
      <om-textarea disabled resize="none"></om-textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Textarea',

  data() {
    return {
      resizes: ['both', 'none', 'horizontal', 'vertical'],
      resize: ''
    }
  },

  methods: {
    handle(s, t) {
      this[t] = s
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
