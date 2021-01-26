import { ref } from 'vue'
import { authService } from '../firebase/config'

const error = ref(null)

const login = async (email, password) => {
  error.value = null

  try {
    const response = await authService.signInWithEmailAndPassword(email, password)
    if(!response){
      throw Error('Failed login')
    }
  }catch(e){
    error.value = e.message
    console.log(error.value)
  }
}

const useLogin = () => {
  return { error, login }
}

export default useLogin