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

export default {
  setup(){
    const { error, signup } = useSignup()

    const name = ref('')
    const email = ref('')
    const password = ref('')

    const handleSubmit = async () => {
      await signup(name.value, email.value, password.value)
      if(!error.value){
        console.log('success')
      }
    }

    return { name, email, password, handleSubmit, error }
  }
}
</script>

<style>

</style>