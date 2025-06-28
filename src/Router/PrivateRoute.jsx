import React from 'react'
import useAuth from '../Hooks/useAuth'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth()
    
    if(loading){
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400 mx-auto"></div>
                    <p className="text-white mt-4 text-lg">Loading...</p>
                </div>
            </div>
        )
    }

    if(!user || user.email !== 'rijoanmaruf@gmail.com'){
        return <Navigate to='/' replace />
    }
    
    return children;
}

export default PrivateRoute