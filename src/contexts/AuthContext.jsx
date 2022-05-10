import React, { createContext, useContext, useEffect, useState } from 'react'
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth'
import { DotLoader } from 'react-spinners'
import { auth } from '../firebase'

const AuthContext = createContext()

const useAuthContext = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [loading, setLoading] = useState(true)

	const register = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = () => {
		return signOut(auth)
	}

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)
			setLoading(false)
		})
	}, [])

	const contextValues = {
		currentUser,
		loading,
		login,
		logout,
		register,
	}

	return (
		<AuthContext.Provider value={contextValues}>
			{loading && (
				<div id="spinner">
					<DotLoader color={"#888"} size={80} />
				</div>
			)}
			{!loading && children}
		</AuthContext.Provider>
	)
}

export { useAuthContext, AuthContextProvider as default }
