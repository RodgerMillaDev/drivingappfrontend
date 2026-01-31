import { create } from "zustand";

const useFBstore = create((set)=>({
    username:null,
    authStatus:"loading",
    userID:null,
    courseProgress:null,
    courseComplete:null,
    coursePaid:null,
    userScore:0,
    testStatus:null,


    setUsername: (uname)=> set({username:uname}),
    setUserID: (uid)=> set({userID:uid}),
    setAuthenticated: (authSt)=>set({authStatus: authSt}),
    setCourseProgress: (cp)=>set({courseProgress:cp}),
    setCourseComplete: (cc)=>set({courseComplete:cc}),
    setCoursePaid: (paid)=>set({coursePaid:paid}),
    setUserScore: (score)=>set({userScore:score}),
    setTestStatus: (ts)=>set({testStatus:ts})
    


}))

export default useFBstore