<template>
  <div>
    <div class="components">
      <router-link to="/button">button</router-link>
      <router-link to="/color-picker">color-picker</router-link>
      <router-link to="/dialog">Dialog</router-link>
      <router-link to="/dropdown">Dropdown</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style>

</style>
