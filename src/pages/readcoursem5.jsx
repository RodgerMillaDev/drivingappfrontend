import cImg from "../media/pexels-tim-samuel-5835364.jpg"
import Navbar from "../components/navbar";
import "../css/readcourse.css";
import Footer from "../components/footer";
import { useNavigate } from "react-router";
import Burner from "../components/burner";
import useFBstore from "../store/fbstore";
import { db } from "../firebase/firebaseConfig";
import { getDocs,collection,updateDoc,doc } from "firebase/firestore";
import { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import Swal from "sweetalert2";
import logo from "../media/ndda-logo.png";
import useStore from "../store/store";
import { Icon } from "@iconify/react";


function ReadCourseM5(){
         const navigate = useNavigate();
         const userID = useFBstore((s)=>s.userID)
         const courseProgress = useFBstore((s)=>s.courseProgress)
          const slideMenu = useStore((s) => s.slideMenu);
          const removeSlideMenu = useStore((s) => s.removeSlideMenu);
          const isAdmin = useFBstore((s)=>s.isAdmin)
          const coursePaid =useFBstore((s)=>s.coursePaid)

          
        
   const toAdmin =()=>{
        navigate("/subuser")
        removeSlideMenu()
      }
        const toLand =()=>{
                        navigate("/")
                        removeSlideMenu()
                      }
                      const toDash =()=>{
                        navigate("/dashboard")
                        removeSlideMenu()
                      }
                  const hideMenuFon = () => {
                      removeSlideMenu();
                    };
                      const logOut =()=>{
                                  Swal.fire({
                                            title:"Are You Sure?",
                                            text:"Please confirm you are signing out!",
                                            icon:"question",
                                            showConfirmButton:true,
                                            confirmButtonText:"Log Out",
                                            showCancelButton:true,
                                            cancelButtonText:"Cancel",
                                            cancelButtonColor:"#"
                                        
                                        }).then((result)=>{
                                            if(result.isConfirmed){
                                            const auth = getAuth()
                                            signOut(auth).then(()=>{
                                                navigate("/auth")
                                            }).catch(()=>{
                                                Swal.fire("Error", "An error occured", "error")
                                            })
                                            }
                                          
                                        })
                            
                              
                            }
                            const signIn =()=>{
                          navigate("/auth")
                
                        }

         
    
    const tomod4 =() =>{
        navigate("/readcourse/hazard-recognition-and-risk-management")
    }
    const totest = async () =>{
         if (userID) {
                 const userRef = doc(db, "Users", userID);
                 updateDoc(userRef, { courseProgress: 100 })
                   .then(() => console.log("Course progress updated "))
                   .catch((err) => console.error("Error updating course progress:", err));
               }
 // fetch all questions
  const snap = await getDocs(collection(db, "Questions"));

  const allQuizIds = snap.docs.map(d => d.id);

  if (allQuizIds.length < 15) {
    throw new Error("Not enough quizzes");
  }

  // shuffle
  const shuffled = allQuizIds.sort(() => 0.5 - Math.random());

  const selected = shuffled.slice(0, 15);

  await updateDoc(doc(db, "Users", userID), {
    quizIds: selected,
  }).then(()=>{
            navigate("/test")

  })
    }
    return (
      <>
      
<div className={`slideNav ${slideMenu ? "slideNavActive" : ""}`}>
            <div className="slideNavPlacer">
              <div className="snlCancel">
                <img src={logo} alt="" />
                <div className="snlCancelCont" onClick={hideMenuFon}>
                  <Icon icon="solar:arrow-right-linear" className="faIcon" />
                </div>
              </div>
              <div className="snlLinks">
               <div className="slideNavLink" onClick={toLand}>
              <p>Home</p>
            </div>

            <div className="slideNavLink" onClick={toDash}>
              <p>Course Module</p>
            </div>
               {isAdmin && <div className="slideNavLink" onClick={toAdmin}>
              <p>Admin Panel</p>
            </div>}
            <div className="slideNavLink" onClick={toDash}>
              <p>My Progress {courseProgress}%</p>
            </div>
    
                <div className="slideNavLink">
                    {userID ? (
                  <p onClick={logOut}>Sign Out</p>
    
                    ) : (      
                    <p onClick={signIn}>Sign In</p>
                )}
                </div>
              </div>
            </div>
    </div>
     <div className="readCoursePage">
            <Navbar/>
            <div className="readCoursePlacer">


                <div className="rcIntro">
                     <span>Module 5</span>
                     <h1>Driver Attitude, Fatigue, and Long-Term
Safety.</h1>
                     <div className="courseIntroImg">
                        <img src={cImg} alt="" />
                     </div>


                </div>
                <div className="rcActCourse">
                    <h2>Driver Attitude, Fatigue, and Long-Term
Safety.</h2>
                    <p>
Driver attitude directly influences driving outcomes. Aggressive behaviors such as speeding,
tailgating, and confrontational actions increase crash risk and escalate dangerous situations.
Defensive drivers prioritize safety and patience over emotional reactions.
                    </p>
                    <p>
 Road rage incidents often
result from stress, impatience, or perceived disrespect. Defensive drivers disengage from
confrontations and avoid responding to aggressive behavior. Emotional control preserves safety
and reduces the likelihood of violence or collisions.
                    </p>
                    <p>
Fatigue impairs reaction time, judgment, and
awareness similarly to alcohol impairment. Drowsy driving is a serious risk on Georgia roadways.
Drivers must recognize signs of fatigue and choose to rest rather than continue driving. Impairment
from alcohol, drugs, or medications severely compromises driving ability. Georgia law strictly
prohibits impaired driving.
                    </p>
                  
                
                    <p>
Defensive drivers understand that no level of impairment is acceptable
when operating a vehicle. Long-term safety depends on consistent defensive habits. Regular
vehicle maintenance, continued education, and disciplined driving behavior support a lifetime of
safe driving and responsible roadway participation.
                    </p>

                     <div className="rcBtns">
                        <button className="prvBtnModule" onClick={tomod4}>Previous Module</button>
                        <button className="nxtBtnModule" onClick={totest}>Take a Test</button>

                     </div>
                </div>
           
            </div>
                 <Burner/>
                <Footer/>

        </div>
      
      </>
       
    )
}

export default ReadCourseM5;