import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore'
import { db } from '../firebase'
import { collection, doc } from 'firebase/firestore'

const useUpdate = ( id, collectionName, ) => {

    const coll = collection( db, collectionName );
    const ref = doc(coll, id)
    const mutation= useFirestoreDocumentMutation(ref, {
        idField: 'id',
        subscribe: true,
    }, {
        refetchOnMount: 'always'
    })

  return mutation
}

export default useUpdate;