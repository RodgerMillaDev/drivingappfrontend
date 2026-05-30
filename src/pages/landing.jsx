import NavbarDark from "../components/darknavbar";
import Navbar from "../components/navbar";
import "../css/landing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AOS from "aos";
import { Navigate, useNavigate } from "react-router";
import "aos/dist/aos.css";

import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  usePresenceData,
  useTransform,
  wrap,
} from "motion/react";
import { Icon } from "@iconify/react";
import { getAuth, signOut } from "firebase/auth";

import user from "../media/pexels-connorscottmcmanus-14823463.jpg";
import Burner from "../components/burner";
import logo from "../media/ndda-logo.png";
import Footer from "../components/footer";
import useStore from "../store/store";
import useFBstore from "../store/fbstore";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Landing() {
  const userID = useFBstore((s)=>s.userID)
  const courseProgress = useFBstore((s)=>s.courseProgress)
  const slideMenu = useStore((s) => s.slideMenu);
      const isAdmin = useFBstore((s)=>s.isAdmin)

  const removeSlideMenu = useStore((s) => s.removeSlideMenu);
  const count = useMotionValue(0);
  const [percentText, setPercentText] = useState("0%");
  const rounded = useTransform(() => Math.round(count.get()));
  const count2 = useMotionValue(0);
  const [percentText2, setPercentText2] = useState("0%");
  const rounded2 = useTransform(() => Math.round(count2.get()));
  const count3 = useMotionValue(0);
  const [percentText3, setPercentText3] = useState("0%");
  const rounded3 = useTransform(() => Math.round(count3.get()));
      const navigate = useNavigate()
      const signIn =()=>{
        navigate("/auth")
      }
   const toLand =()=>{
        navigate("/")
        removeSlideMenu()
      }
   const toAdmin =()=>{
        navigate("/subuser")
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
    const unsubscribe = rounded.on("change", (latest) => {
      setPercentText(`${latest}K`);
    });
    return () => unsubscribe();
  }, [rounded]);

  useEffect(() => {
    const controls = animate(count, 40, { duration: 5 });
    return () => controls.stop();
  }, []);
  useEffect(() => {
    const unsubscribe = rounded2.on("change", (latest) => {
      setPercentText2(`${latest}+`);
    });
    return () => unsubscribe();
  }, [rounded2]);

  useEffect(() => {
    const controls = animate(count2, 100, { duration: 5 });
    return () => controls.stop();
  }, []);
  useEffect(() => {
    const unsubscribe = rounded3.on("change", (latest) => {
      setPercentText3(`${latest}`);
    });
    return () => unsubscribe();
  }, [rounded3]);

  useEffect(() => {
    const controls = animate(count3, 20, { duration: 5 });
    return () => controls.stop();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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
      <div className="hero">
        <div className="heroNav">
          <Navbar />
        </div>
        <div className="heroCont">
          <div className="heroLeft">
            <div className="heroLeftCont">
              <h1>
                National Defensive <br /> <span>Driving Academy.</span>{" "}
              </h1>
              <p>
                Enroll in an online course today and take the first step towards
                enhancing your safety in today's high-risk traffic environment,
                while also qualifying for a substantial insurance discount!
              </p>
              <button onClick={toDash}>Start Course</button>
            </div>
            <div className="heroLeftContSum">
              <div className="hlcPlacer">
                <div className="hlcCard">
                  <motion.span>{percentText}</motion.span>
                  <p>Safer Drivers</p>
                </div>

<div className="hlcCard">
                  <motion.span>{percentText3}</motion.span>
                  <p>Awards Won</p>
                </div>
                <div className="hlcCard">
                  <motion.span>{percentText2}</motion.span>
                  <p>Testimonials</p>
                </div>
                
              </div>
            </div>
          </div>
          <div className="heroRight">
            <div className="heroRightDark"></div>
          </div>
        </div>
      </div>
      <section className="xpSection">
        <div className="xpsPlacer">
          <div className="xpsLeft">
            <h2>
              {" "}
              <span>15 Years</span> <br />
              of Experience.
            </h2>
          </div>
          <div className="xpsRight">
            <p>
              With decades of experience,the National Defensive Driving Academy
              brings a wealth of knowledge and expertise to the field of driver
              education. Over ten years of experience in teaching defensive
              driving techniques and promoting road safety.
            </p>
          </div>
        </div>
      </section>
      <section className="miniCourses">
        <div className="mcPlacer">
          <div className="mcPlacerCards">
            <div className="cmCard" data-aos="fade-up">
              <div className="cmCardPlacer">
                <div className="cmCardTop">
                  <button onClick={toDash}>Read</button>
                  <Icon icon="solar:arrow-right-up-linear" className="faIcon" />
                </div>
                <div className="cmCardBtm">
                  <h3>Defensive Driving Techniques</h3>
                  <p>
                    Learn how to anticipate and react to potential hazards,
                    avoid collisions, and maintain a safe following distance.
                  </p>
                </div>
              </div>
            </div>
            <div className="cmCard seccmCard" data-aos="fade-up">
              <div className="cmCardPlacer">
                <div className="cmCardTop">
                  <button onClick={toDash}>Read</button>
                  <Icon icon="solar:arrow-right-up-linear" className="faIcon" />
                </div>
                <div className="cmCardBtm">
                  <h3>Traffic Laws and Regulations</h3>
                  <p>
                    Gain a deep understanding of the latest traffic laws,
                    regulations, and road signs to ensure compliance and prevent
                    violations.
                  </p>
                </div>
              </div>
            </div>
            <div className="cmCard" data-aos="fade-up">
              <div className="cmCardPlacer">
                <div className="cmCardTop">
                  <button onClick={toDash}>Read</button>
                  <Icon icon="solar:arrow-right-up-linear" className="faIcon" />
                </div>
                <div className="cmCardBtm">
                  <h3>Hazard Recognition</h3>
                  <p>
                    Develop the ability to identify and respond to various road
                    hazards, from aggressive drivers to adverse weather
                    conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="saveCash">
        <div className="saveCashPlacer">
          <div className="saveCashLeft">
            <div className="sclFloatBtn"></div>
          </div>
          <div className="saveCsshRight">
            <div className="scrCont">
              <span>SAVE MONEY</span>
              <h2>Improve Drive Safety</h2>
              <p>
                At National Defensive driving academy, our mission is to empower
                individuals with the knowledge, skills, and confidence to become
                responsible, safe, and courteous drivers. We are dedicated to
                providing comprehensive and interactive driver education equips
                them for a lifetime of safe and defensive driving.
              </p>
              <button>Start Now</button>
            </div>
          </div>
        </div>
      </section>
      <section className="Testimonial">
        <div className="testimonialPlacer">
          <div className="testimonialCard" data-aos="fade-right">
            <span>
              {" "}
              <FontAwesomeIcon icon={faQuoteRight} className="faIcon" />
            </span>
            <h2>
              I recently completed the defensive driving course, and I must say
              it was an eye-opening experience. The course not only refreshed my
              knowledge of traffic rules and regulations but also equipped me
              with invaluable skills to become a safer and
              <span> more responsible driver.</span>{" "}
            </h2>
            <div className="userSaid">
              <img src={user} alt="" />
              <div className="userDet">
                <p>William Josh.</p>
                <p>Driver</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Burner />
      <Footer />
    </>
  );
}
export default Landing;
