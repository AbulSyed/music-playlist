import { ref } from "vue"
import { firestoreService } from "../firebase/config"

const useDocument = (collection, id) => {
  const error = ref(null)

  const deleteDoc = async () => {
    error.value = null

    try {
      await firestoreService.collection(collection).doc(id).delete()
    }catch(e){
      error.value = e.message
      console.log(error.value)
    }
  }

  return { error, deleteDoc }
}

export default useDocument