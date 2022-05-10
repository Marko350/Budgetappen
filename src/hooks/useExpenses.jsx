import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { db } from '../firebase'
import { collection, where, query, orderBy } from 'firebase/firestore'

const useExpenses = (id) => {

  const queryRef = query((collection(db, 'expenses')), where('category', '==', id), orderBy('created', 'desc'))
  const expensesQuery = useFirestoreQueryData(['expenses', id], queryRef, {
    idField: 'id',
    subscribe: true,
  }, {
    refetchOnMount: 'always'
  })

  return expensesQuery
}

export default useExpenses