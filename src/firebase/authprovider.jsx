import { useEffect } from "react";
import { auth } from "./firebaseConfig";
import { db } from "./firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import useFBstore from "../store/fbstore";

function AuthProvider() {
  const setUserID = useFBstore((s) => s.setUserID);
  const setAuthenticated = useFBstore((s) => s.setAuthenticated);
  const setUsername = useFBstore((s) => s.setUsername);
  const setCourseProgress = useFBstore((s) => s.setCourseProgress);
  const setCourseComplete = useFBstore((s) => s.setCourseComplete);
  const setCoursePaid = useFBstore((s) => s.setCoursePaid);
  const setUserScore = useFBstore((s) => s.setUserScore);
  const setTestStatus = useFBstore((s) => s.setTestStatus);
  const setIsAdmin = useFBstore((s)=>s.setIsAdmin)

  useEffect(() => {
    // 1️⃣ Auth listener (runs once)
    const unsubAuth = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setUserID(null);
        setAuthenticated(false);
        const isAdm = false;
        setIsAdmin(isAdm);

        return;
      }

      setUserID(user.uid);
      setAuthenticated(true);
       const tokenResult = await user.getIdTokenResult();
    const isAdm = tokenResult.claims.admin || false;
    setIsAdmin(isAdm);

      // 2️⃣ Firestore user listener
      const userRef = doc(db, "Users", user.uid);

      const unsubUser = onSnapshot(userRef, (snapshot) => {
        if (!snapshot.exists()) return;

        const data = snapshot.data();

        setUsername(data.name);
        setCourseProgress(data.courseProgress);
        setCourseComplete(data.courseComplete);
        setCoursePaid(data.coursePaid);
        setUserScore(data.score);
        setTestStatus(data.TestStatus);
      });

      // Cleanup Firestore listener when user logs out
      return () => unsubUser();
    });

    // Cleanup auth listener
    return () => unsubAuth();
  }, []);

  return null;
}

export default AuthProvider;
