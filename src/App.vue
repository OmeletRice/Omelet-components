<template>
  <div id="app">
    <p>example:</p>
    <example-all></example-all>
  </div>
</template>

<script>
import ExampleAll from '../example/index'
import './theme-default/lib/index.css'
export default {
  name: 'app',
  components: {
    ExampleAll
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
