<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="document" class="single">
    <div class="details">
      <div class="image">
        <img :src="document.coverUrl" alt="">
      </div>
      <h2>{{ document.title }}</h2>
      <p>Created by {{ document.name }}</p>
      <p>{{ document.description }}</p>
      <button v-if="authUser" @click="handleClick">Delete playlist</button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import getDocument from '../../composables/getDocument'
import getUser from '../../composables/getUser'
import useCollection from '../../composables/useCollection'
import useStorage from '../../composables/useStorage'
import { useRouter } from 'vue-router'

export default {
  props: ['id'],
  setup(props){
    const { document, error } = getDocument('playlists', props.id)
    const { user } = getUser()
    const { deleteDoc } = useCollection('playlists')
    const { deleteImage } = useStorage()

    const authUser = computed(() => {
      return document.value && user.value && user.value.uid == document.value.userId
    })

    const router = useRouter()

    const handleClick = async () => {
      await deleteDoc(props.id)
      await deleteImage(document.value.filePath)
      router.push({ name: 'Home' })
    }

    return { document, error, authUser, handleClick }
  }
}
</script>

<style scoped>
  .single {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
  }
  .details h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .details p {
    padding: 4px 0;
  }
  .image {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
  }
  .image img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
  }
</style>