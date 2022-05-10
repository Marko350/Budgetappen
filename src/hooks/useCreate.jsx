import { useAuthContext } from "../contexts/AuthContext";
import { db } from "../firebase";
import { collection, doc, addDoc, serverTimestamp } from "firebase/firestore"

const useCreate = () => {

    const { currentUser } = useAuthContext();

    
    const createCategory = async ( categoryName ) => {
        const collectionRef = collection(db, "categories");
        try {
            
            await addDoc(collectionRef, {
                created: serverTimestamp(),
                name: categoryName,
                owner: currentUser.uid,
            })

            console.log("New category is created")
        } catch (e) {
            console.log("Error! New category was not created.")
            console.log(e.message)
        }
    }

    const createExpense = async ( categoryName = null, expenseAmount = null, id = null ) => {
        const collectionRef = collection(db, "expenses");
        try {
            
            await addDoc(collectionRef, {
                created: serverTimestamp(),
                name: categoryName,
                amount: Number(expenseAmount),
                owner: currentUser.uid,
                category: id,
            })

            console.log("New expense is created")
        } catch (e) {
            console.log("Error! New expense was not created.")
            console.log(e.message)
        }
    }

    const createIncome = async ( incomeName = null, amount = null ) => {
        const collectionRef = collection(db, "income");
        try {
            
            await addDoc(collectionRef, {
                created: serverTimestamp(),
                name: incomeName,
                amount: Number(amount),
                owner: currentUser.uid,
            })

            console.log("New income is created")
        } catch (e) {
            console.log("Error! New income was not created.")
            console.log(e.message)
        }
    } 

    const createObjective = async ( objectiveName = null, amount = null ) => {
        const collectionRef = collection(db, "objective");
        try {
            
            await addDoc(collectionRef, {
                created: serverTimestamp(),
                name: objectiveName,
                cost: Number(amount),
                owner: currentUser.uid,
                depozit: Number(0),
            })

            console.log("New objective is created")
        } catch (e) {
            console.log("Error! New objective was not created.")
            console.log(e.message)
        }
    }  


    return {
        createCategory,
        createExpense,
        createIncome,
        createObjective,
    }

}

export default useCreate;