import cImg from "../media/pexels-jordan-besson-2051439001-29271763.jpg"
import Navbar from "../components/navbar";
import "../css/readcourse.css";
import Footer from "../components/footer";
import Burner from "../components/burner";
import { useNavigate } from "react-router";
import { db } from "../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import useFBstore from "../store/fbstore";
import { useEffect } from "react";

function ReadCourseM4(){

      const userID = useFBstore((s)=>s.userID)
    const navigate = useNavigate();
    
    const tomod3 =() =>{
        navigate("/readcourse/hazard-recognition-and-risk-management")
    }
    const tomod5 =() =>{
        navigate("/readcourse/driver-attitude-fatigue=and-long-term-safety")
    }
      useEffect(() => {
      
      if (userID) {
        const userRef = doc(db, "Users", userID);
        updateDoc(userRef, { courseProgress: 80 })
          .then(() => console.log("Course progress updated "))
          .catch((err) => console.error("Error updating course progress:", err));
      }
    }, [userID]);

    return (
        <div className="readCoursePage">
            <Navbar/>
            <div className="readCoursePlacer">


                <div className="rcIntro">
                     <span>Module Four</span>
                     <h2>Collision Avoidance and Emergency
Maneuvers.</h2>
                     <p>Lorem, ipsum doloe rer erer.</p>
                     <div className="courseIntroImg">
                        <img src={cImg} alt="" />
                     </div>


                </div>
                <div className="rcActCourse">
                    <h4>Collision avoidance</h4>
                    <p>
Collision avoidance involves responding correctly when hazards require immediate action.
Defensive drivers are trained to brake smoothly, steer deliberately, and maintain control under
pressure.
                    </p>
                    <p>
Sudden or aggressive inputs can lead to loss of control and increased crash severity.
Proper braking techniques include applying steady pressure and avoiding abrupt braking unless
necessary. Modern vehicles may include anti-lock braking systems, which require drivers to
maintain pressure while steering around obstacles. Understanding braking systems improves
emergency response.
                    </p>
                    <h4>Emergency maneuvers</h4>
                    <p>
Steering control is critical during evasive maneuvers. Defensive drivers look
in the direction they intend to travel rather than focusing on hazards. This visual strategy improves
vehicle control and helps avoid overcorrection or panic responses.
                    </p>
                  
                
                    <p>
Skid recovery requires calm and
controlled actions. Drivers must reduce speed, ease off pedals, and steer smoothly in the direction
of the skid. Practicing defensive techniques builds confidence and reduces panic during real
emergencies. Preparedness is the key to collision avoidance.
                    </p>
<p>
    Drivers who understand vehicle
limitations and practice defensive techniques are better equipped to respond effectively when faced
with sudden hazards.
</p>
                     <div className="rcBtns">
                        <button className="prvBtnModule" onClick={tomod3}>Previous Module</button>
                        <button className="nxtBtnModule" onClick={tomod5}>Next Module</button>

                     </div>
                </div>
           
            </div>
                 <Burner/>
                <Footer/>

        </div>
    )
}

export default ReadCourseM4;