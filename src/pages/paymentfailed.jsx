import { useNavigate } from "react-router"
import "../css/complete.css"
import fail from "../media/undraw_warning_tl76.svg"

export default function Failed(){

    const navigate = useNavigate()

    const back = ()=>{
        navigate("/dashboard")
    } 

    return (
        <div className="completeWrap">
            <img src={fail} alt="" />
            <p>Payment Failed!</p>
            <span>Your payment failed. Do you wish to try again</span>
            <button onClick={back}>Back</button>
        </div>
    )
}