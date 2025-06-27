import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { auth } from '../../Firebase/firebase.init'


const AuthProvider = ({children}) => {

    const [user , setUser] = useState(null)
    const [loading , setLoading] = useState(true)

    const googleProvider = new GoogleAuthProvider()
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth , googleProvider)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("User in the OnAuthStateChange : " , user);
            setLoading(false);
        });
        
        return () => {
            unSubscribe()
        }
    }, [])

    const authInfo = {
        user ,
        loading,
        signInWithGoogle,
    }
  return (
    <AuthContext value={authInfo}>
        {children}
    </AuthContext>
  )
}

export default AuthProvider