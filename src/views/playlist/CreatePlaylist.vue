<template>
  <form @submit.prevent="handleSubmit">
    <h3>Create new playlist</h3>
    <input type="text" required placeholder="Playlist title" v-model="title">
    <textarea required placeholder="Playlist description" v-model="description"></textarea>
    <label>Upload playlist cover image</label>
    <input type="file" @change="handleChange">
    <div class="error">{{ fileError }}</div>
    <button>Create</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useStorage from '../../composables/useStorage'
import useCollection from '../../composables/useCollection'
import getUser from '../../composables/getUser'
import { timestamp } from '../../firebase/config'
import { useRouter } from 'vue-router'

export default {
  setup(){
    const { url, filePath, uploadImage } = useStorage()
    const { error, addDoc } = useCollection('playlists')
    const { user } = getUser()

    const title = ref('')
    const description = ref('')
    const file = ref(null)
    const fileError = ref(null)

    const router = useRouter()

    const handleSubmit = async () => {
      if(file.value){
        await uploadImage(file.value)
        const response = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          name: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp()
        })
        if(!error.value){
          router.push({ name: 'PlaylistDetails', params: { id: response.id } })
        }
      }
    }

    const allowedTypes = ['image/png', 'image/jpeg']

    const handleChange = (e) => {
      const selected = e.target.files[0]

      if(selected && allowedTypes.includes(selected.type)){
        file.value = selected
        fileError.value = null
      }else{
        file.value = null
        fileError.value = 'Please select an image file (png or jpg)'
      }
    }

    return { title, description, handleSubmit, handleChange, fileError }
  }
}
</script>

<style>
  input[type="file"] {
    border: 0;
    padding: 0;
  }
  label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
  }
  button {
    margin-top: 20px;
  }
</style>