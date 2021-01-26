<template>
  <button v-if="!showForm" @click="showForm = true">Add song</button>
  <form v-if="showForm" @submit.prevent="handleSubmit">
    <h3>Add song</h3>
    <input type="text" required placeholder="title" v-model="title">
    <input type="text" required placeholder="artist" v-model="artist">
    <button>Add</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import { v4 } from 'uuid'
import useCollection from '../composables/useCollection'

export default {
  props: ['playlist'],
  setup(props){
    const title = ref('')
    const artist = ref('')
    const showForm = ref(false)
    const { updateDoc } = useCollection('playlists')

    const handleSubmit = async () => {
      const song = {
        title: title.value,
        artist: artist.value,
        id: v4()
      }
      await updateDoc(props.playlist.id, {
        songs: [...props.playlist.songs, song]
      })
      title.value = ''
      artist.value = ''
    }

    return { title, artist, showForm, handleSubmit }
  }
}
</script>

<style scoped>
  form {
    max-width: 100%;
    text-align: left;
  }
</style>