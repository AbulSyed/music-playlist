<template>
  <h3>My playlists</h3>
  <div v-if="error">{{ error }}</div>
  <div v-if="documents">
    <playlist-view :playlists="documents"></playlist-view>
  </div>
</template>

<script>
import getCollection from '../../composables/getCollection'
import getUser from '../../composables/getUser'
import PlaylistView from '../../components/PlaylistView.vue'

export default {
  components: { PlaylistView },
  setup(){
    const { user } = getUser()
    const { documents, error } = getCollection('playlists', ['userId', '==', user.value.uid])

    return { documents, error }
  }
}
</script>

<style>

</style>