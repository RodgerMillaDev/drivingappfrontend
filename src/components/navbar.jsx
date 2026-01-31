import { Navigate, useNavigate } from "react-router";
import "../css/navbar.css"
import useFBstore from "../store/fbstore";

function Navbar(){
    const navigate = useNavigate()
    const toHome=()=>{
        navigate("/dashboard")
    
    }

    const toCertificate =()=>{
        navigate("/complete")
    }
    
    const testStatus = useFBstore((s)=>s.testStatus)

  return (
    <div className="gen-navbar">

        <div className="gnbPlcer">
            <div className="gnbLogo">
                <p>NDDA</p>
            </div>
            <div className="gnbLinks">
                <div className="gnbLink">
                    <p>Home</p>
                </div>
                <div className="gnbLink">
                    <p>About Us</p>
                </div>
                <div className="gnbLink gnbLinkActive" onClick={toHome} >
                    <p>Course Modules</p>
                </div>
                <div className="gnbLink">
                    <p>My Progress</p>
                </div>

                {testStatus == "completed" &&
                
                 <div className="gnbLink" onClick={toCertificate}>
                    <p>Download Certificate</p>
                </div>


                }
               
            </div>
            <div className="gnbBtn">
                <button>Get Support</button>
            </div>
        </div>
        
    </div>
  )
}

export default Navbar;