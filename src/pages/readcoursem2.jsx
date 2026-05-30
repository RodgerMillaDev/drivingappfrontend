import cImg from "../media/pexels-kindelmedia-7715189.jpg"
import Navbar from "../components/navbar";
import "../css/readcourse.css";
import Footer from "../components/footer";
import { useEffect } from "react";
import Burner from "../components/burner";
import { useNavigate } from "react-router";
import { db } from "../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import useFBstore from "../store/fbstore";
import { getAuth, signOut } from "firebase/auth";
import Swal from "sweetalert2";
import logo from "../media/ndda-logo.png";
import useStore from "../store/store";
import { Icon } from "@iconify/react";


function ReadCourseM2(){
      
      const navigate = useNavigate();
      const userID = useFBstore((s)=>s.userID)
      const courseProgress = useFBstore((s)=>s.courseProgress)
      const slideMenu = useStore((s) => s.slideMenu);
      const removeSlideMenu = useStore((s) => s.removeSlideMenu);
                const isAdmin = useFBstore((s)=>s.isAdmin)

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
        
        
    const tomod1 =() =>{
        navigate("/readcourse/introduction-to-defensive-driving")
    }
    const tomod3 =() =>{
         if (userID) {
        const userRef = doc(db, "Users", userID);
        updateDoc(userRef, { courseProgress: 40 })
          .then(() =>{
             console.log("Course progress updated")
        navigate("/readcourse/hazard-recognition-and-risk-management")

          })
          .catch((err) => console.error("Error updating course progress:", err));
      }
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
                     <span>Module 2</span>
                     <h1>Georgia Traffic Laws and Safe Driving
Responsibilities.</h1>
                     <div className="courseIntroImg">
                        <img src={cImg} alt="" />
                     </div>


                </div>
                <div className="rcActCourse">
                    <h2>Georgia Traffic Laws</h2>
                    <p>
Georgia traffic laws establish the framework for safe roadway use and driver accountability. These
laws govern speed limits, right-of-way rules, lane usage, and vehicle operation standards.
                    </p>
                    <p>
Compliance with traffic laws is not optional; it is a legal and ethical responsibility for all drivers.
Speed limits in Georgia are designed to reflect road design, traffic volume, and surrounding
conditions. Driving above posted limits reduces reaction time and increases crash severity.
Defensive drivers adjust speed not only to legal limits but also to weather, traffic, and visibility
conditions.
                    </p>
                    <p>
Georgia’s Hands-Free Law prohibits drivers from holding or supporting electronic
devices while operating a vehicle. Distracted driving significantly increases collision risk and is a
leading cause of traffic accidents. Defensive drivers eliminate distractions and keep full attention on
the driving task. Seat belt laws and child restraint requirements protect occupants during collisions.
                    </p>
                  
                
                    <p>
Georgia law mandates seat belt use for drivers and passengers, and appropriate child safety seats
based on age and size. Defensive driving includes ensuring all occupants are properly restrained
before moving. Understanding traffic laws allows drivers to anticipate the behavior of others.
                    </p>
                    <p>
                        Knowledge of legal requirements improves decision-making, reduces violations, and supports safe
navigation of complex traffic situations.
                    </p>

                     <div className="rcBtns">
                        <button className="prvBtnModule" onClick={tomod1}>Previous Module</button>
                        <button className="nxtBtnModule" onClick={tomod3}>Next Module</button>

                     </div>
                </div>
           
            </div>
                 <Burner/>
                <Footer/>

        </div>
        </>
    
    )
}

export default ReadCourseM2;