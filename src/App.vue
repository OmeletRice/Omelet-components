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
