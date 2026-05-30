import cImg from "../media/pexels-element5-1051071.jpg"
import Navbar from "../components/navbar";
import "../css/readcourse.css";
import Footer from "../components/footer";
import Burner from "../components/burner";
import { useNavigate } from "react-router";
import { db } from "../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import useFBstore from "../store/fbstore";
import { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import Swal from "sweetalert2";
import logo from "../media/ndda-logo.png";
import useStore from "../store/store";
import { Icon } from "@iconify/react";





function ReadCourseM1(){
    const userID = useFBstore((s)=>s.userID)
    const navigate = useNavigate();
    const courseProgress = useFBstore((s)=>s.courseProgress)
          const isAdmin = useFBstore((s)=>s.isAdmin)

      const slideMenu = useStore((s) => s.slideMenu);
      const removeSlideMenu = useStore((s) => s.removeSlideMenu);
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

    const tomod2 =() =>{
        if (userID) {
    const userRef = doc(db, "Users", userID);
    updateDoc(userRef, { courseProgress: 20 })
      .then(() => {
        console.log("Course progress updated to 20")
        navigate("/readcourse/georgia-traffic-laws-and-safe-driving-responsibilities")

      }
        
    )
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
                     <span>Module 1</span>
                     <h1>Introduction to Defense Driving.</h1>
                     <div className="courseIntroImg courseIntroImg1">
                        <img src={cImg} alt="" />
                     </div>


                </div>
                <div className="rcActCourse">
                    <h2>What is Defensive Driving?</h2>
                    <p>
Defensive driving is a structured approach to operating a motor vehicle that emphasizes
anticipation, awareness, and deliberate control. Rather than reacting to danger after it occurs,
defensive drivers actively search for potential risks and adjust their driving behavior in advance.
                    </p>
                    <p>
This approach significantly reduces the likelihood of accidents, injuries, and fatalities on Georgia
roadways. Georgia presents unique driving challenges, including congested metropolitan areas,
high-speed interstates, rural roads, and frequent weather shifts. Defensive driving prepares
motorists to adapt to these conditions by maintaining focus, managing speed, and staying alert to
environmental changes. Every driving decision should prioritize safety over convenience or
urgency.
                    </p>
                    <p>
A core principle of defensive driving is accepting responsibility. Drivers must assume that
other motorists may make unsafe decisions at any moment. This assumption leads to increased
following distances, reduced speed in high-risk areas, and heightened situational awareness.
Responsibility also includes recognizing personal limitations and avoiding risky behaviors.
Defensive driving requires mental discipline. Emotional reactions such as frustration, anger, or
impatience impair judgment and reaction time. Defensive drivers maintain emotional control,
allowing them to respond calmly and effectively to unexpected situations. This discipline helps
prevent road rage incidents and aggressive driving behaviors.
                    </p>
                  
                
                    <p>
By committing to defensive driving
principles, motorists protect themselves, passengers, and other road users. This commitment
supports long-term driving privileges, lowers legal exposure, and promotes safer communities
throughout Georgia.
                    </p>

                     <div className="rcBtns">
                        <button className="nxtBtnModule" onClick={tomod2}>Next Module</button>

                     </div>
                </div>
           
            </div>
                 <Burner/>
                <Footer/>

        </div>
        </>
        
        
    )
}

export default ReadCourseM1;