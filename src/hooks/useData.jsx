import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { db } from '../firebase'
import { collection, where, query, orderBy } from 'firebase/firestore'
import { useAuthContext } from '../contexts/AuthContext'

const useData = ( col ) => {
  const { currentUser } = useAuthContext()

  const queryRef = query((collection(db, col)), where(`owner`, '==', currentUser.uid), orderBy('created', 'desc'))
  const dataQuery = useFirestoreQueryData([col, currentUser.uid], queryRef, {
    idField: 'id',
    subscribe: true,
  }, {
    refetchOnMount: 'always'
  })

  return dataQuery
}

export default useData