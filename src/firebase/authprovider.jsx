import { useEffect } from "react"
import { auth } from "./firebaseConfig"
import useFBstore from "../store/fbstore"
import { useNavigate } from "react-router"


function AuthProvider(){
    const userID = useFBstore((s)=>s.userID)
    const setUserID = useFBstore((s)=>s.setUserID)
    const setAuthenticated = useFBstore((s)=>s.setAuthenticated)
    const navigate = useNavigate()

    useEffect(()=>{
       const unsub = auth.onAuthStateChanged(async(user)=>{
        if(!user){
            setUserID(null)
            setAuthenticated(false)
        }else{
           setUserID(user.uid)
           console.log(user.uid)
           setAuthenticated(true)
        }
       })
       return ()=> unsub();
    },[userID])



    return null;
}

export default AuthProvider;