import { Navigate, useNavigate } from "react-router";
import "../css/navbar.css"
import { Icon } from "@iconify/react";
import logo from "../media/ndda-logo.png"
import useFBstore from "../store/fbstore";
import Swal from "sweetalert2";
import { useEffect,useRef,useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import useStore from "../store/store";
function NavbarDark(){
    
    const [open, setOpen] = useState(false);
  const setSlideMenu = useStore((s)=>s.setSlideMenu)
    const navigate = useNavigate()
    const userID = useFBstore((s)=>s.userID)
        const isAdmin = useFBstore((s)=>s.isAdmin)
        const coursePaid = useFBstore((s)=>s.coursePaid)
        const authStatus = useFBstore((s)=>s.authStatus)

    const courseProgress = useFBstore((s)=>s.courseProgress)
   const [angle, setAngle] = useState("0deg");
      const [CP, setCP] = useState("0deg");
    
 const showMenuFon =()=>{
        setSlideMenu()
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
    
  const go = (url) => {
        console.log(authStatus)

    if(authStatus){
 setOpen(false);
    if(coursePaid){
    navigate(url);

    }else{
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
   
 }else if(authStatus=="loading"){
 }else{
   navigate("/auth")

 }

  };

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
    const toAdmin=()=>{
        navigate("/subuser")
    }

    const toHome=()=>{
        navigate("/")
    }
        const testStatus = useFBstore((s)=>s.testStatus)
   const toCertificate =()=>{
        navigate("/completetest")
    }
   
      useEffect(() => {
        if (courseProgress == null) return;
    
        // wait one frame so transition can kick in
        requestAnimationFrame(() => {
          setAngle(`${courseProgress * 3.6}deg`);
          setCP(courseProgress);
          console.log(`${courseProgress * 3.6}deg`)
        });
      }, [courseProgress]);


 

  return (
    <div className="gen-navbar">
        <div className="gnbPlcer">
            <div className="gnbLogo gnbLogoDark">
                <img src={logo} alt="" />
            </div>
            <div className="gnbLinks gnbLinksDark">
                <div className="gnbLink" onClick={toHome}>
                    <p>Home</p>
                </div>
          
                 <div
      className="gnbLink gnbLinkDd"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <p>Course Modules</p>

      <div className={`dropDown ${open ? "show" : ""}`}>
        <p onClick={() => go("/readcourse/introduction-to-defensive-driving")} className={`${CP == 20 ? "activeLinkModule" : ""} `} >Module 1</p>
        <p onClick={() => go("/readcourse/georgia-traffic-laws-and-safe-driving-responsibilities")} className={`${CP == 40 ? "activeLinkModule" : ""} `}>Module 2</p>
        <p onClick={() => go("/readcourse/hazard-recognition-and-risk-management")} className={`${CP == 60 ? "activeLinkModule" : ""} `}>Module 3</p>
        <p onClick={() => go("/readcourse/collision-avoidance-and-emergency-maneuvers")} className={`${CP == 80 ? "activeLinkModule" : ""} `}>Module 4</p>
        <p onClick={() => go("/readcourse/driver-attitude-fatigue=and-long-term-safety")} className={`${CP == 100 ? "activeLinkModule" : ""} `}>Module 5</p>
      </div>
               </div>
            
                   {testStatus == "completed" &&
                
                 <div className="gnbLink" onClick={toCertificate}>
                    <p>Download Certificate</p>
                </div>

                }
            </div>
          <div className="gnbBtn gnbBtnDark">
            {userID && <div className="navProgress">
                    <p>My Progress</p>
                    <div className="progressCircleWrap"
                    
                    style={{ "--a": angle }}
                    >
                        
                       <span>{courseProgress}</span>
                    </div>
                </div>}
             
                <div className="fonNavIcon fonNavIcondark"  onClick={showMenuFon}>
                <Icon icon="solar:hamburger-menu-linear" className="faIcon"/>
                </div>
                <div className="navUser" onClick={logOut}>
                    <Icon icon="solar:logout-outline" className="faIcon"/>
                </div>
                {isAdmin &&  <div className="navUser" onClick={toAdmin}>
                    <Icon icon="solar:user-outline" className="faIcon"/>
                </div>}
            </div>
           
        </div>
        
    </div>
  )
}

export default NavbarDark;