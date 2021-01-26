import { ref } from 'vue'
import { authService } from '../firebase/config'

const user = ref(authService.currentUser)

authService.onAuthStateChanged(userStatus => {
  console.log('User status changed to', userStatus)
  user.value = userStatus
})

const getUser = () => {
  return { user }
}

export default getUser