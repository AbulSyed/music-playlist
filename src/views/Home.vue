<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="documents">
    <list-view :playlists="documents"></list-view>
  </div>
</template>

<script>
import getCollection from '../composables/getCollection'
import ListView from '../components/ListView.vue'

export default {
  components: { ListView },
  setup(){
    const { documents, error } = getCollection('playlists')

    return { documents, error }
  }
}
</script>

<style>

</style>