import { Icon } from "@iconify/react";
import user from "../media/user.png";
import "../css/dashboard.css";
import Dashmain from "../components/userdashmain";
import GraphWrap from "../components/usergraph";
import Footer from "../components/footer";
import Burner from "../components/burner";
import useFBstore from "../store/fbstore";
import NavbarDark from "../components/darknavbar";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { ProgressBar } from "@fluentui/react-components";
function Dashboard() {

const courseProgress = useFBstore((s)=>s.courseProgress)
const [pl, setPl] =useState(0)
const coursePaid = useFBstore((s)=>s.coursePaid)
const progressBarDiv = useRef(null)
  const userID = useFBstore((s)=>s.userID)
  const authStatus = useFBstore((s)=>s.authStatus)
  const navigate = useNavigate()

  

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
  const amount = 1;

  const resp = await fetch("https://drvingappbackend.onrender.com/paynow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount,userID }),
  });

  const { url } = await resp.json();

  window.location.href = url; // 🚀 Redirect

};


  const modules = [
  { id: "m1", url: "/readcourse/introduction-to-defensive-driving" },
  { id: "m2", url: "/readcourse/georgia-traffic-laws-and-safe-driving-responsibilities" },
  { id: "m3", url: "/readcourse/hazard-recognition-and-risk-management" },
  { id: "m4", url: "/readcourse/collision-avoidance-and-emergency-maneuvers" },
  { id: "m5", url: "/readcourse/driver-attitude-fatigue=and-long-term-safety" },
];


function readModule(e){
  console.log(e)
 const module = modules.find((m) => m.id === e);
  if (!module) return;


  if (coursePaid) {
    navigate(module.url); // navigate to the specific module
   }else{
  Swal.fire({
  title: "Payment Required",
  text: "Please complete a $20 payment to access this course.",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Go Back",
  cancelButtonText: "Proceed to Payment"
}).then((result) => {
  if (result.isConfirmed) {
     
  }else{

paynow()
  }
});
   }
}


  return (
    <div className="dashboard">
      <div className="dashboardContainer">
        <div className="dcTop">
                <NavbarDark />
                <div className="dcTopIntro">
                  <h1>Become a Pro in<br />
                   Defensive Driving Today</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
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
                  <p>Lorem ipsum dolor sit amet lorem300 consectetur adipisicing elit. Culpa libero nulla sit tempore corporis quasi cumque sequi, error nesciunt magnam!</p>
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
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa libero nulla sit tempore corporis quasi cumque sequi, error nesciunt magnam!</p>
                </div>
                <div className="dcmcBtm">
                  <button onClick={() => readModule("m2")}>Read Module</button>
                </div>

              </div>
              
            </div>
            <div className="dcModuleCard dcModuleCard3">
              <div className="dcmcDesc">
                <div className="dcmcTop">
                  <span>Hazard Recognition and Risk
Management</span>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa libero nulla sit tempore corporis quasi cumque sequi, error nesciunt magnam!</p>
                </div>
                <div className="dcmcBtm">
                  <button onClick={() => readModule("m3")}>Read Module</button>
                </div>

              </div>
              
            </div>
            <div className="dcModuleCard dcModuleCard4">
              <div className="dcmcDesc">
                <div className="dcmcTop">
                  <span>Collision Avoidance and Emergency
Maneuvers</span>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa libero nulla sit tempore corporis quasi cumque sequi, error nesciunt magnam!</p>
                </div>
                <div className="dcmcBtm">
                  <button onClick={() => readModule("m4")}>Read Module</button>
                </div>

              </div>
              
            </div>
            <div className="dcModuleCard dcModuleCard5">
              <div className="dcmcDesc">
                <div className="dcmcTop">
                  <span>Driver Attitude, Fatigue, and Long-Term
Safety</span>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa libero nulla sit tempore corporis quasi cumque sequi, error nesciunt magnam!</p>
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
  );
}

export default Dashboard;
