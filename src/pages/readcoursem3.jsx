import cImg from "../media/pexels-mike-van-schoonderwalt-1884800-5505120.jpg";
import Navbar from "../components/navbar";
import "../css/readcourse.css";
import Footer from "../components/footer";
import Burner from "../components/burner";
import { useNavigate } from "react-router";
import { db } from "../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import useFBstore from "../store/fbstore";
import { useEffect } from "react";


function ReadCourseM3() {
   const userID = useFBstore((s)=>s.userID)
    const navigate = useNavigate();
    
    const tomod2 =() =>{
        navigate("/readcourse/georgia-traffic-laws-and-safe-driving-responsibilities")
    }
    const tomod4 =() =>{
        navigate("/readcourse/collision-avoidance-and-emergency-maneuvers")
    }
    
       useEffect(() => {
      
      if (userID) {
        const userRef = doc(db, "Users", userID);
        updateDoc(userRef, { courseProgress: 60 })
          .then(() => console.log("Course progress updated "))
          .catch((err) => console.error("Error updating course progress:", err));
      }
    }, [userID]);
  return (
    <div className="readCoursePage">
      <Navbar />
      <div className="readCoursePlacer">
        <div className="rcIntro">
          <span>Module Three</span>
          <h2>Hazard Recognition and Risk Management.</h2>
          <p>Lorem, ipsum doloe rer erer.</p>
          <div className="courseIntroImg">
            <img src={cImg} alt="" />
          </div>
        </div>
        <div className="rcActCourse">
          <h4>Hazard Recognition and Risk Management</h4>
          <p>
            Hazard recognition is the foundation of defensive driving. Hazards
            include any condition or behavior that increases the likelihood of a
            collision. Common hazards include:
          </p>
          <ul>
            <li>Distracted drivers</li>
            <li>Aggressive drivers</li>
            <li>Pedestrians</li>
            <li>cyclists</li>
            <li>Animals</li>
            <li>Construction zones</li>
            <li>Adverse weather conditions</li>
          </ul>
          <p>
           Defensive drivers use active scanning techniques to identify hazards early. This includes looking far
ahead, checking mirrors frequently, and monitoring blind spots. Continuous scanning provides
critical time to adjust speed and positioning before hazards become emergencies. Maintaining
proper following distance is a key risk management strategy.
          </p>
          <p>
            Increased space between vehicles
allows drivers more time to react to sudden stops or unexpected maneuvers. Defensive drivers
increase following distance in poor weather, heavy traffic, or limited visibility.
          </p>

          <p>
           Vehicle positioning
also plays a role in risk reduction. Defensive drivers avoid lingering in blind spots and position their
vehicle to maximize visibility and escape options. Lane selection and spacing reduce exposure to
unpredictable driver behavior.
          </p>
          <p>
         behavior. Effective risk management requires judgment and patience. Yielding
when uncertain, slowing early, and avoiding unnecessary maneuvers reduce collision risk and
support consistent, controlled driving behavior.
          </p>

          <div className="rcBtns">
            <button className="prvBtnModule" onClick={tomod2}>Previous Module</button>
            <button className="nxtBtnModule" onClick={tomod4}>Next Module</button>
          </div>
        </div>
      </div>
      <Burner />
      <Footer />
    </div>
  );
}

export default ReadCourseM3;
