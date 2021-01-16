<template>
  <form @submit.prevent="handleSubmit">
    <h3>Signup</h3>
    <input type="text" required placeholder="name" v-model="name">
    <input type="email" required placeholder="email" v-model="email">
    <input type="password" required placeholder="password" v-model="password">
    <div class="error">{{ error }}</div>
    <button>Signup</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useSignup from '../../composables/useSignup'
import { useRouter } from 'vue-router'

export default {
  setup(){
    const { error, signup } = useSignup()

    const name = ref('')
    const email = ref('')
    const password = ref('')

    const router = useRouter()

    const handleSubmit = async () => {
      await signup(name.value, email.value, password.value)
      if(!error.value){
        router.push({ name: 'Home' })
      }
    }

    return { name, email, password, handleSubmit, error }
  }
}
</script>

<style>

</style>