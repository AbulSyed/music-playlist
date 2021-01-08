import { ref } from "vue"
import { authService } from "../firebase/config"

const error = ref(null)

const signup = async (name, email, password) => {
  error.value = null

  try {
    const response = await authService.createUserWithEmailAndPassword(email, password)
    if(!response){
      throw Error('Could not complete signup')
    }
    await response.user.updateProfile({ displayName: name })
  }catch(e){
    error.value = e.message
    console.log(error.value)
  }
}

const useSignup = () => {
  return { error, signup }
}

export default useSignup