import { ref } from 'vue'
import { storageService } from '../firebase/config'
import getUser from './getUser'

const { user } = getUser()

const useStorage = () => {
  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`
    const storageRef = storageService.ref(filePath.value)

    try {
      const response = await storageRef.put(file)
      url.value = response.ref.getDownloadURL()
    }catch(e){
      error.value = e.message
      console.log(error.value)
    }
  }

  return { error, url, filePath, uploadImage }
}

export default useStorage