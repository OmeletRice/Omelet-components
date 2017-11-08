<template>
  <div>
    <om-row>
      <om-col :span="4">
        <div class="components">
          <router-link to="/button">button</router-link>
          <router-link to="/color">Color</router-link>
          <router-link to="/layout">Layout</router-link>
          <router-link to="/radio">Radio</router-link>

          <router-link to="/color-picker">color-picker</router-link>
          <router-link to="/dialog">Dialog</router-link>
          <router-link to="/dropdown">Dropdown</router-link>
          <router-link to="/input">Input</router-link>
          <router-link to="/input-changebox">InputChangebox</router-link>
          <router-link to="/input-number">InputNumber</router-link>
        </div>
      </om-col>
      <om-col :span="20">
        <router-view></router-view>
      </om-col>
    </om-row> 
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style scoped>
.components {
  text-align: right;
}

.components a {
  display: block;
  padding: 5px;
}
</style>
