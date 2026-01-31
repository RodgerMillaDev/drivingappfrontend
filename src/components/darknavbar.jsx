import { Navigate, useNavigate } from "react-router";
import "../css/navbar.css"

function NavbarDark(){
    const navigate = useNavigate()
    const toHome=()=>{
        navigate("/dashboard")
    }
  return (
    <div className="gen-navbar">
        <div className="gnbPlcer">
            <div className="gnbLogo gnbLogoDark">
                <p>NDDA</p>
            </div>
            <div className="gnbLinks gnbLinksDark">
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
            </div>
            <div className="gnbBtn gnbBtnDark">
                <button>Get Support</button>
            </div>
        </div>
        
    </div>
  )
}

export default NavbarDark;