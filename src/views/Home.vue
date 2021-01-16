<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="documents">
    <playlist-view :playlists="documents"></playlist-view>
  </div>
</template>

<script>
import getCollection from '../composables/getCollection'
import PlaylistView from '../components/PlaylistView.vue'

export default {
  components: { PlaylistView },
  setup(){
    const { documents, error } = getCollection('playlists')

    return { documents, error }
  }
}
</script>

<style>

</style>