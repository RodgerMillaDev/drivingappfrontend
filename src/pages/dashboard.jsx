import { Icon } from "@iconify/react";
import user from "../media/user.png";
import "../css/dashboard.css";
import Dashmain from "../components/userdashmain";
import GraphWrap from "../components/usergraph";
import Footer from "../components/footer";
import Burner from "../components/burner";
import useFBstore from "../store/fbstore";
import NavbarDark from "../components/darknavbar";
import useStore from "../store/store";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { getAuth, signOut } from "firebase/auth";
import logo from "../media/ndda-logo.png";
import { ProgressBar } from "@fluentui/react-components";
function Dashboard() {
  const slideMenu = useStore((s) => s.slideMenu);
  const removeSlideMenu = useStore((s) => s.removeSlideMenu);
const courseProgress = useFBstore((s)=>s.courseProgress)
const [pl, setPl] =useState(0)
          const isAdmin = useFBstore((s)=>s.isAdmin)

const coursePaid = useFBstore((s)=>s.coursePaid)
const progressBarDiv = useRef(null)
  const userID = useFBstore((s)=>s.userID)
  const authStatus = useFBstore((s)=>s.authStatus)
  const navigate = useNavigate()
     const toAdmin =()=>{
        navigate("/subuser")
        removeSlideMenu()
      }

   const signIn =()=>{
          navigate("/auth")

        }
     const toLand =()=>{
        navigate("/")
        removeSlideMenu()
      }
      const toDash =()=>{
        navigate("/dashboard")
        removeSlideMenu()
      }
        
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
  
    const hideMenuFon = () => {
      removeSlideMenu();
    };

useEffect(() => {
  if (courseProgress !== null && courseProgress !== undefined) {
    progressBarDiv.current.style.width = `${courseProgress}%`;
    setPl(courseProgress);
  }
}, [courseProgress]);


useEffect(()=>{
  if(authStatus== false){
    navigate("/auth")
  }
},[authStatus])
     
const paynow = async () => {
  const amount = 15;

  const resp = await fetch("https://drvingappbackend-ix55.onrender.com/paynow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount,userID }),
  });

  const result = await resp.json();
  console.log(result)

  window.location.href = result.url; // 🚀 Redirect

};


  const modules = [
  { id: "m1", url: "/readcourse/introduction-to-defensive-driving" },
  { id: "m2", url: "/readcourse/georgia-traffic-laws-and-safe-driving-responsibilities" },
  { id: "m3", url: "/readcourse/hazard-recognition-and-risk-management" },
  { id: "m4", url: "/readcourse/collision-avoidance-and-emergency-maneuvers" },
  { id: "m5", url: "/readcourse/driver-attitude-fatigue=and-long-term-safety" },
];


function readModule(e) {
  const module = modules.find((m) => m.id === e);
  if (!module) return;

  if (coursePaid) {
    navigate(module.url);
  } else {
    Swal.fire({
      title: "Payment Required",
      text: "Please complete a $15 payment to access this course.",
      icon: "warning",
      showCancelButton: true,

      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Go Back",

      reverseButtons: true, // 👈 THIS FIXES THE BUTTON ORDER
    }).then((result) => {
      if (result.isConfirmed) {
        paynow(); // 🔥 now runs on the right-side primary action
      }
    });
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
    <div className="dashboard">
      <div className="dashboardContainer">
        <div className="dcTop">
                <NavbarDark />
                <div className="dcTopIntro">
  <h1>Master the Skills of <br /> Defensive Driving</h1>
  <p>Learn to anticipate hazards, drive safely, and protect yourself and others on the road.</p>
</div>

        </div>
        <div className="dcBtm">
          <div className="dcBtmMiniIntro">
            <p>Your Progress: {pl}%</p>
            <div className="progressBarWrap">
              <div className="progressBar" ref={progressBarDiv}></div>
            </div>
            
          </div>
          <div className="dcModules">
            <div className="dcModuleCard dcModuleCard1">
              <div className="dcmcDesc">
                <div className="dcmcTop">
  <span>Introduction to Defensive Driving</span>
  <p>
    This module introduces the fundamentals of defensive driving, helping you stay safe, anticipate hazards, and make better decisions on the road.
  </p>
</div>

                <div className="dcmcBtm">
                  <button onClick={() => readModule("m1")}>Read Module</button>
                </div>

              </div>
              
            </div>
            <div className="dcModuleCard dcModuleCard2">
              <div className="dcmcDesc">
             <div className="dcmcTop">
  <span>Georgia Traffic Laws and Safe Driving</span>
  <p>
    Learn the key traffic laws in Georgia and essential safe driving practices to help prevent accidents and stay compliant on the road.
  </p>
</div>

                <div className="dcmcBtm">
                  <button onClick={() => readModule("m2")}>Read Module</button>
                </div>

              </div>
              
            </div>
            <div className="dcModuleCard dcModuleCard3">
              <div className="dcmcDesc">
               <div className="dcmcTop">
  <span>Hazard Recognition and Risk Management</span>
  <p>
    Learn how to identify potential hazards on the road and manage risks effectively to prevent accidents and stay safe while driving.
  </p>
</div>

                <div className="dcmcBtm">
                  <button onClick={() => readModule("m3")}>Read Module</button>
                </div>

              </div>
              
            </div>
            <div className="dcModuleCard dcModuleCard4">
              <div className="dcmcDesc">
               <div className="dcmcTop">
  <span>Collision Avoidance and Emergency Maneuvers</span>
  <p>
    Learn practical techniques to avoid collisions and handle emergency situations safely, ensuring better control of your vehicle in critical moments.
  </p>
</div>

                <div className="dcmcBtm">
                  <button onClick={() => readModule("m4")}>Read Module</button>
                </div>

              </div>
              
            </div>
            <div className="dcModuleCard dcModuleCard5">
              <div className="dcmcDesc">
                <div className="dcmcTop">
  <span>Driver Attitude, Fatigue, and Long-Term Safety</span>
  <p>
    Understand how driver mindset, fatigue, and long-term habits affect safety, and learn strategies to stay alert, focused, and responsible on the road.
  </p>
</div>

                <div className="dcmcBtm">
                  <button onClick={() => readModule("m5")}>Read Module</button>
                </div>

              </div>
              
            </div>
        
          </div>

        </div>
      
      </div>
      <Burner />
      <Footer/>
    </div>
    </>
    
  );
}

export default Dashboard;
