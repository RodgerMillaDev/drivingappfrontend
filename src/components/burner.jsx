import "../css/footer.css"
import { useNavigate } from "react-router";

function Burner(){
    const navigate = useNavigate()
    const toDash =()=>{
        navigate("/dashboard")
    }

   return(
    <div className="Burner">
        <div className="burnerPlacer">
            <div className="topSpan">
                Driving Course
            </div>
            <span className="midSpan">Our Most Popular Courses</span>
            <p className="btmSpan">
               Our "Georgia Defensive driving " course combines engaging multimedia content, interactive simulations, and experienced instructors to create a dynamic learning experience.
            </p>
            <button onClick={toDash}>Get Started</button>
        </div>
    </div>
   )
}

export default Burner;