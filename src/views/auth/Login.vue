<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" required placeholder="email" v-model="email">
    <input type="password" required placeholder="password" v-model="password">
    <div class="error">{{ error }}</div>
    <button>Login</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useLogin from '../../composables/useLogin'
import { useRouter } from 'vue-router'

export default {
  setup(){
    const { error, login } = useLogin()

    const email = ref('')
    const password = ref('')

    const router = useRouter()

    const handleSubmit = async () => {
      await login(email.value, password.value)
      if(!error.value){
        router.push({ name: 'Home' })
      }
    }

    return { email, password, handleSubmit, error }
  }
}
</script>

<style>

</style>