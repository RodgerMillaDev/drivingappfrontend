
import useFBstore from "../store/fbstore";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
function Protected({children}){
   const userID = useFBstore((s)=>s.userID);
   const navigate = useNavigate();
   const authStatus= useFBstore((s)=>s.authStatus)
   const setUsername = useFBstore((s) => s.setUsername)
   const setCourseComplete = useFBstore((s)=>s.setCourseComplete)
   const setCourseProgress = useFBstore((s)=>s.setCourseProgress)
   const setCoursePaid = useFBstore((s)=>s.setCoursePaid)
   const setTestStatus = useFBstore((s)=>s.setTestStatus)

    useEffect(()=>{
      const run= async()=>{

           if(authStatus == true){
           const docRef = doc(db, "Users", userID)
           const userSnap = await getDoc(docRef)
           if(userSnap.exists()){
            const uname = userSnap.data().name;
            const cp = userSnap.data().courseProgress;
            setUsername(uname)
            setCourseProgress(cp)

           }
        }else if(authStatus== false){
           navigate("/auth")
        }
        else{
        }
      }
      run()

    },[authStatus])
    
useEffect(() => {
  if (authStatus === "loading" || !authStatus || !userID) return;

  const docRef = doc(db, "Users", userID);

  const unsub = onSnapshot(docRef, (snapshot) => {
    if (!snapshot.exists()) return;

    const cp = snapshot.data().courseProgress;
    const cc = snapshot.data().courseComplete;
    const paid = snapshot.data().coursePaid;
    const ts = snapshot.data().TestStatus

    setCourseProgress(cp);
    setCourseComplete(cc);
    setCoursePaid(paid)
    setTestStatus(ts)

  });

  return () => unsub();
}, [userID, authStatus]);

    return children;
    
  
}

export default Protected;