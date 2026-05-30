import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../css/complete.css";
import payCard from "../media/undraw_pay-with-credit-card_77g6.svg";

import axios from "axios";
import "ldrs/react/Bouncy.css";
import { Bouncy } from "ldrs/react";
import Swal from "sweetalert2";

import { getAuth } from "firebase/auth";

export default function Complete() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  const param = new URLSearchParams(window.location.search);
  const sessionId = param.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!sessionId) {
          Swal.fire("Invalid session", "Missing session ID", "error");
          return;
        }

        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          Swal.fire("Not logged in", "Please login again", "error");
          navigate("/login");
          return;
        }

        const token = await user.getIdToken();

        const res = await axios.post(
          "https://drvingappbackend-ix55.onrender.com/verify-payment",
          { sessionId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res.data);

        Swal.fire({
          title: "Payment received",
          text: "Thank you! You can now start the course.",
          icon: "success",
          confirmButtonText: "Start Course",
        }).then(() => {
          navigate("/readcourse/introduction-to-defensive-driving");
        });

      } catch (err) {
        console.error(err);

        Swal.fire(
          "Verification failed",
          "If you just paid, please wait a moment and refresh.",
          "error"
        );
      } finally {
        setLoader(false);
      }
    };

    verifyPayment();
  }, [sessionId, navigate]);

  return (
    <div className="completeWrap">
      <img src={payCard} alt="Payment illustration" />
      <h3>Verifying Payment...</h3>
      <p>Please wait while we confirm your payment.</p>

      {loader && (
        <div className="loaderWrapPaymentCheck">
          <Bouncy size="45" speed="1" color="#EB1E26" />
        </div>
      )}
    </div>
  );
}