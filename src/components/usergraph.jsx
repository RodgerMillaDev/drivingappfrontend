import GaugeComponent from "react-gauge-component";

import "../App.css"
import useFBstore from "../store/fbstore";
import "../css/usergraph.css"
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router";
export default function GraphWrap(){
  const userID = useFBstore((s)=>s.userID)
  const navigate = useNavigate()





const paynow = async () => {
  const amount = 1;

  const resp = await fetch("https://drvingappbackend.onrender.com/paynow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount,userID }),
  });

  const { url } = await resp.json();

  window.location.href = url; // 🚀 Redirect

};


  const courseProgress = useFBstore((s)=>s.courseProgress)


    return(
        <>
            <div className="graphTop">
                <p>Your Progress</p>
<GaugeComponent
  value={courseProgress}
  type="semicircle"
  minValue={0}
  maxValue={100}
  arc={{
      width: 0.1,
      cornerRadius: 10,
      nbSubArcs: 3,
      colorArray: ["#005064", "#FFCB49", "#FD4B23"],
      padding: .03,
      subArcsStrokeWidth: 1,
      subArcsStrokeColor: "#ffffffff",
      effects: {
        glow: false,
        glowBlur: 1,
        glowSpread: 0,
        innerShadow: false
      },
      subArcs: [],
      padEndpoints: true
    }}
  pointer={{
      type: "arrow",
      elastic: false,
      animationDelay: 200,
      animationDuration: 1000,
      length: 0.75,
      width: 6,
      baseColor: "#ffffff",
      strokeWidth: 0.5,
      strokeColor: "#000000",
      maxFps: 60,
      animationThreshold: 0.0096,
      arrowOffset: 0.6
    }}
  labels={{
      valueLabel: {
        matchColorWithArc: true,
        style: { fontSize: "29px",fontFamily:"font1", fontWeight: "bold" },
        offsetY: 25,
        animateValue: true
      },
      tickLabels: {
        type: "outer",
        hideMinMax: false,
        autoSpaceTickLabels: true,
   
      }
    }}
/>            </div>
            <div className="graphBtm">
              <button onClick={paynow}>Pay</button>

            </div>

        </>
    )
}
