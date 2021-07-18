<template>
  <div id="app">
    <Board msg="Welcome to the Notes Board client!"/>
  </div>
</template>

<script>
import Board from './components/Board.vue'

export default {
  name: 'App',
  components: {
    Board
  }
}
</script>