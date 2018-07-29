<template>
  <div class="home-lists">
    <broadcaster-grid tags="Popular"></broadcaster-grid>
    <broadcaster-grid tags="Top"></broadcaster-grid>
    <broadcaster-grid tags="New"></broadcaster-grid>
    <broadcaster-grid></broadcaster-grid>
  </div>
</template>
<script>
  import BroadcasterGrid from '../components/BroadcasterGrid/BroadcasterGrid.vue'

  export default {
    components: {
      BroadcasterGrid
    }
  }
</script>
