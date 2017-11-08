<template>
  <div class="om-color-box">
    <div class="box-item-color"
      v-for="c in colors" :key="c.hex"
      :style="{ backgroundColor: c.hex }">
      <p>{{ c.name }}</p>
      <p>{{ c.hex }}</p>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'OmColor',

  data() {
    return {
      colors: [
        {
          name: 'Blue',
          type: 'Main',
          hex: '#3498DB'
        },
        {
          name: 'Success',
          type: 'Success',
          hex: '#1ABC9C'
        },
        {
          name: 'Warning',
          type: 'Warning',
          hex: '#F1C40F'
        },
        {
          name: 'Danger',
          type: 'Danger',
          hex: '#E74C3C'
        },
        {
          name: 'Info',
          type: 'Info',
          hex: '#BDC3C7'
        }
      ]
    }
  }
}
</script>

<style>
.box-item-color {
  width: 230px;
  height: 100px;
  margin: 20px;
  display: inline-block
}
</style>
