import { ref } from "vue"
import { authService } from "../firebase/config"

const error = ref(null)

const logout = async () => {
  error.value = null

  try {
    await authService.signOut()
  }catch(e){
    error.value = e.message
    console.log(error.value)
  }
}

const useLogout = () => {
  return { error, logout }
}

export default useLogout