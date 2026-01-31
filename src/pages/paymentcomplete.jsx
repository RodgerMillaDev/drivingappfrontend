import { useNavigate } from "react-router"
import "../css/complete.css"
import payCard from "../media/undraw_pay-with-credit-card_77g6.svg"

import axios from "axios"
    import "ldrs/react/Bouncy.css";

import { Bouncy } from "ldrs/react"
import Swal from "sweetalert2";
import { useState } from "react"
export default function Complete(){

    const param =new URLSearchParams(window.location.search)
    const sessionId = param.get("session_id")
    const [loader, setLoader] = useState(false)
    
    
    const navigate = useNavigate()

    const confirmPay = ()=>{
        setLoader(true)
        axios.post("https://drvingappbackend.onrender.com/confirm-pay",{
            sessionId,
            
        })
        .then((res)=>{
                    setLoader(false)

            console.log(res)
            if(res.data.paid == true){
  Swal.fire({
                        title: "Payment received",
                        text: "Thank you! Do you wish to begin your course right away",
                        icon: "success",
                        confirmButtonText: "Start Course",
                    }).then((result) => {
                        if (result.isConfirmed) {
                          navigate("/readcourse")
           
                        }else{
                            navigate("/dashboard")
                        }
                    });  

            }else{
                Swal.fire("Payment Incomplete", "We've not yet  received your payment", "error")
            }

        }).catch((err)=>{
            Swal.fire("An error occured","Try again again later", "error")
            setLoader(false)
            console.log(err)
        })
    } 


    return (
        <div className="completeWrap">
            <img src={payCard} alt="" />
            <p>Paid already?</p>
            <span>Confirm your payment to continue</span>
          
            {loader ? (   <div className="loaderWrapPaymentCheck">
                 <Bouncy
                                  size="45"
                                  speed="1"
                                  color="#00752F" 
                ></Bouncy> 
            </div>) : (
            <button onClick={confirmPay}>Confirm Payment</button>

            )}
        </div>
    )
}