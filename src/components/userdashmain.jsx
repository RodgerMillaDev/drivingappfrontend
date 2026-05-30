import { useEffect, useState } from "react"
import "../css/dashmain.css"
import useFBstore from "../store/fbstore"

export default function Dashmain(){
    const courseProgress = useFBstore((s)=>s.courseProgress)
    const username = useFBstore((s)=>s.username)
    const [fname, setFName] = useState("0")

    useEffect(()=>{
        if(username){
          const nameArr = username.split(" ");
    setFName(nameArr[0])
        }

    },[username])
    return(
        <div className="dashmaincont">
            <div className="dashmainGreetings">
                <span>Greetings {fname},</span>
            </div>
            <div className="dashmainWrap">
                <div className="dashmainminiCont">
 <div className="dmwTop">
                    <div className="dmwBox1">
                        <div className="dmwbCont">
   <p>Our mission is to empower individuals with the knowledge, skills, and confidence to become responsible, safe, and courteous drivers.</p>
                        <button>Start Course</button>
                        </div>
                     
                    </div>
                    <div className="dmwBox2">
                           <span>{courseProgress}%</span>
                           <p>Course Progress</p>
                    </div>
                </div>
                <div className="dmwBtm">
                    <div className="dmwBtmIntro">
                        <p>Course Outline</p>
                    </div>
                    <div className="dmwCourseWapOutline">
                        <div className="dmwCourseCard">
                            <div className="dmwCourseName">
                                                                <p>Module 1:</p>

                                <h4>Introduction to Defense Driving.</h4>
                            </div>
                            <div className="dmwCourseAction">
                                <p>Read</p>
                            </div>

                        </div>
                        <div className="dmwCourseCard">
                            <div className="dmwCourseName">
                                                                <p>Module 2:</p>

                                <h4>Georgia Traffic Laws and Safe Driving Responsibities.</h4>
                            </div>
                                   <div className="dmwCourseAction">
                                <p>Read</p>
                            </div>
                        </div>
                        <div className="dmwCourseCard">
                            <div className="dmwCourseName">
                                                                <p>Module 3:</p>

                                <h4>Hazard Recognition and Risk Management.</h4>
                            </div>
                                   <div className="dmwCourseAction">
                                <p>Read</p>
                            </div>
                        </div>
                        <div className="dmwCourseCard">
                            <div className="dmwCourseName">
                                                                <p>Module 4:</p>

                                <h4>Collision Avoidance and Emergency Maneuvers.</h4>
                            </div>
                                   <div className="dmwCourseAction">
                                <p>Read</p>
                            </div>
                        </div>
                        <div className="dmwCourseCard">
                            <div className="dmwCourseName">
                                                                <p>Module 5:</p>

                                <h4>Driver Attitude, Fatigue and Long-Term Safety.</h4>
                            </div>
                                   <div className="dmwCourseAction">
                                <p>Read</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>


               
            </div>
        </div>
    )
}