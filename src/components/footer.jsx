import logo from "../media/ndda-logo.png"
import { useNavigate } from "react-router"
function Footer(){
    const navigate = useNavigate()
    const toHome =()=>{
        navigate("/")
    }
    const toDash =()=>{
        navigate("/dashboard")
    }
    const toSupport =()=>{
        navigate("/support")
    }

    return (
        <footer>
            <div className="footerPlacer">
                <div className="footerTop">
                    <div className="fLogo">
                        <img src={logo} alt="" />
   <p>Our mission is to empower individuals with the knowledge, skills, and confidence to become responsible, safe, and courteous drivers.</p>
                    </div>
                    <div className="footerLinks">
                        <div className="flLeft">
                            <div className="fLinkTitle">
                                <h2>Quick Links</h2>
                            </div>
                            <div className="flmLinks">
                                     <p onClick={toHome}>Home</p>
                            <p onClick={toDash}>Course Modules</p>

                                </div>
                        </div>
                    </div>
                </div>
                <div className="footerBtm">
                    <span>
                       &copy; 2026 NDDA. All Rights Reserved. 
                    </span>
                
                </div>
            </div>

        </footer>
    )

}
export default Footer;