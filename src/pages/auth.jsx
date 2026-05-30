import driver from "../media/pexels-alexander-mass-748453803-22669774.jpg";
import "../css/auth.css";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import { Bouncy, Jelly } from "ldrs/react";
import { useNavigate } from "react-router";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import logo from "../media/ndda-logo.png"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import "ldrs/react/Bouncy.css";
import { useEffect, useState, useRef } from "react";
function Auth() {
  const signEm = useRef(null);
  const signNm = useRef(null);
  const signPass = useRef(null);
  const signCpass = useRef(null);
  const logEm = useRef(null);
  const logPass = useRef(null);
  const navigate = useNavigate();
  const [logLoader, setLogLoader] = useState();
  const [signLoader, setSignLoader] = useState();
  const [isLog, setIsLog] = useState();



const resetPass = async () => {
  const { value: email } = await Swal.fire({
    input: "email",
    text: "Enter your email address",
    inputPlaceholder: "you@yourdomain.com",
  });

  if (!email) return;

  const actionCodeSettings = {
    url: "https://nationaldefensivedrivingacademy.com/reset-password",
    handleCodeInApp: false,
  };

  sendPasswordResetEmail(auth, email, actionCodeSettings)
    .then(() => {
      Swal.fire(
        "Email Sent",
        "Password reset link has been sent to your email.",
        "success"
      );
    })
    .catch((error) => {
      Swal.fire(
        "Error",
        error.message,
        "error"
      );
    });
};
useEffect(() => {
    setIsLog(true);
  }, []);
const toLog = () => {
    setIsLog(true);
  };
const toSign = () => {
    setIsLog(false);
  };
const SignUp = () => {
    const fn = signNm.current.value;
    const em = signEm.current.value;
    const pass = signPass.current.value;
    const cpass = signCpass.current.value;

    if (fn && em && pass && cpass) {
      if (pass === cpass) {
        setSignLoader(true);

        createUserWithEmailAndPassword(auth, em, pass)
          .then((userCred) => {
            var user = userCred.user;
            sendEmailVerification(user).then(async () => {
              const userData = {
                name: fn,
                em: em,
                uid: user.uid,
                fonReg: "",
                sexReg: "",
                photoUrl: "",
                profUpdate: false,
                courseProgress: 0,
                courseComplete: false,
                coursePaid: false,
                amountPaid: 0,
                TestStatus:"",
                
              };
              await setDoc(doc(db, "Users", user.uid), userData).then(() => {
               Swal.fire(
   "Verification Email Sent!",
   "Check your inbox. Not there? Peek in your <strong>spam</strong> folder.",
  "success").then(() => {
                  setSignLoader(false);
                  toLog();
                });
              });
            });
          })
          .catch((err) => {
            setSignLoader(false);
            console.log(err)

            if (err.code === "auth/email-already-in-use") {
              Swal.fire("", "Email already in use. Try logging in.", "warning");
            }
            if (err.code === "auth/invalid-email") {
              Swal.fire("", "Use a valid email", "warning");
            }
          });
      } else {
        Swal.fire("", "Your passwords dont match", "warning");
      }
    } else {
      Swal.fire("", "Oops! Looks like you missed a field", "warning");
    }
 };
const LogIn = () => {
    const em = logEm.current.value;
    const pass = logPass.current.value;

    if (em && pass) {
      setLogLoader(true);

      signInWithEmailAndPassword(auth, em, pass)
        .then((userCred) => {
          var user = userCred.user;
          if (user.emailVerified) {
            navigate("/dashboard");
          } else {
            auth.signOut();
            Swal.fire({
              title: "Email Not Verified",
              text: "Please verify your email before signing in.",
              icon: "warning",
              confirmButtonText: "Resend Verification Email",
            }).then((result) => {
              setLogLoader(false);
              if (result.isConfirmed) {
                // Resend verification email
                sendEmailVerification(user).then(() => {
                  //  setLogLoader(true)

         Swal.fire(
   "Verification Email Sent!",
   "Check your inbox. Not there? Peek in your <strong>spam</strong> folder.",
  "success");
                });
              }
            });
          }
        })
        .catch((error) => {
          setLogLoader(false);

          var errCode = error.code;
          console.log(error);
          if (
            errCode === "auth/invalid-email" ||
            errCode === "auth/wrong-password" ||
            errCode === "auth/internal-error" ||
            errCode === "auth/invalid-credential"
          ) {
            Swal.fire("Invalid email or password", "error");
            setLogLoader(false);
          } else {
            Swal.fire("", "An error occured try again later", "warning");
            setLogLoader(false);

            console.log(error);
          }
        });
    } else {
      Swal.fire("", "Oops! Looks like you missed a field", "warning");
      setLogLoader(false);
    }
};
  return (
    <div className="authPage">
      <div className="authLeft">
        <img src={driver} alt="" />
        <div className="authLeftWrapper">
          <div className="authMiniCont">
            <h1>Responsible, Safe & Courteous Drivers.</h1>
            <p>
             Learn at your own pace and build safer driving habits with expert guidance.

            </p>
           
          </div>
        </div>
      </div>
      <div className="authRight">
        <div className="authRightWrap">
          {isLog ? (
            <div className="authLog">
              <div className="authIntro">
                 <img src={logo} alt="" />
                <span>Welcome back,</span>
                <p>Log in to access your account.</p>
              </div>
              <form
  onSubmit={(e) => {
    e.preventDefault();
    LogIn();
  }}
>
              <div className="authContWrap">
                <div className="inputWrap">
                  <div className="inputIcon">
                    <Icon className="faIcon" icon="solar:letter-bold" />
                  </div>
                  <div className="inputActWrap">
                    <input ref={logEm} type="email" placeholder="Email" />
                  </div>
                </div>
                <div className="inputWrap">
                  <div className="inputIcon">
                    <Icon className="faIcon" icon="solar:lock-bold" />
                  </div>
                  <div className="inputActWrap">
                    <input
                      ref={logPass}
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>
              <div className="authBtnWrap">
                {logLoader ? (
                  <Bouncy size="45" speed="1" color="#EB1E26"></Bouncy>
                ) : (
                  <button type="submit">Log In</button>
                )}
              </div>
              </form>

              <div className="authOpt">
                <p>
                  Don't have an account? <span onClick={toSign}>Sign Up</span>
                </p>
                <p onClick={resetPass}>Reset password </p>
              </div>
            </div>
          ) : (
            <div className="authSign">
              <div className="authIntro">

                <img src={logo} alt="" />
                <span>Create an account.</span>
                <p>Get started, its free!</p>
              </div>
                            <form
  onSubmit={(e) => {
    e.preventDefault();
    SignUp();
  }}
>
              <div className="authContWrap">
                <div className="inputWrap">
                  <div className="inputIcon">
                    <Icon className="faIcon" icon="solar:user-bold" />
                  </div>
                  <div className="inputActWrap">
                    <input ref={signNm} type="text" placeholder="Full Name" />
                  </div>
                </div>
                <div className="inputWrap">
                  <div className="inputIcon">
                    <Icon className="faIcon" icon="solar:letter-bold" />
                  </div>
                  <div className="inputActWrap">
                    <input ref={signEm} type="email" placeholder="Email" />
                  </div>
                </div>
                <div className="inputWrap">
                  <div className="inputIcon">
                    <Icon className="faIcon" icon="solar:lock-bold" />
                  </div>
                  <div className="inputActWrap">
                    <input
                      ref={signPass}
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div className="inputWrap">
                  <div className="inputIcon">
                    <Icon className="faIcon" icon="solar:lock-bold" />
                  </div>
                  <div className="inputActWrap">
                    <input
                      ref={signCpass}
                      type="password"
                      placeholder="Confirm Password"
                    />
                  </div>
                </div>
              </div>
              <div className="authBtnWrap">
                {signLoader ? (
                  <Bouncy size="45" speed="1" color="#EB1E26"></Bouncy>
                ) : (
                  <button type="submit">Sign Up</button>
                )}
              </div>
              </form>
              <div className="authOpt">
                <p>
                  Already have an account? <span onClick={toLog}>Log In</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
