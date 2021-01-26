import { ref } from 'vue'
import { firestoreService } from '../firebase/config'

const useCollection = (collection) => {
  const error = ref(null)

  const addDoc = async (doc) => {
    error.value = null

    try {
      const response = await firestoreService.collection(collection).add(doc)
      return response
    }catch(e){
      error.value = e.message
      console.log(error.value)
    }
  }

  const deleteDoc = async (id) => {
    error.value = null

    try {
      await firestoreService.collection(collection).doc(id).delete()
    }catch(e){
      error.value = e.message
      console.log(error.value)
    }
  }

  return { error, addDoc, deleteDoc }
}

export default useCollection