import {  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";



export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user, setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const axiosPublic=useAxiosPublic();

    const signUp=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const signIn=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    const logOut=()=>{
        setLoading(true)
        return signOut(auth);

    }
    const updateUserInfo=(userName)=>{
        return updateProfile(auth.currentUser, {
            displayName: userName
        })
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            if(currentUser){
                setUser(currentUser)
                // console.log(currentUser);
                
                const userInfo={email: currentUser.email}
                axiosPublic.post('/jwt',userInfo)
                .then(result=>{
                    if(result.data.token){
                        localStorage.setItem('access-token',result.data.token)
                    }
                })
            }
            else{
                setUser(null)
                localStorage.removeItem('access-token')
            }
            setLoading(false)

        })
        return ()=>{
            return unsubscribe()
        }
    },[axiosPublic])
    const userInfo={
        user,loading,signUp,signIn,logOut,updateUserInfo
    }
    
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;