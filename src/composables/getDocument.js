import { ref, watchEffect } from "vue"
import { firestoreService } from "../firebase/config"

const getDocument = (collection, id) => {
  const document = ref(null)
  const error = ref(null)

  let documentRef = firestoreService.collection(collection).doc(id)

  const unsub = documentRef.onSnapshot(snap => {
    if(snap.data()){
      document.value = { ...snap.data(), id: snap.id }
      error.value = null
    }else{
      throw Error('No data available')
    }
  }, (e) => {
    error.value = e.message
    console.log(error.value)
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub())
  })

  return { document, error }
}

export default getDocument