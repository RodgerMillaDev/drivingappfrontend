import driver from "../media/pexels-shkrabaanthony-7144208.jpg";
import "../css/auth.css";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import { Bouncy, Jelly } from "ldrs/react";
import { useNavigate } from "react-router";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
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

  const resetPass = async () => {
    const { value: email } = await Swal.fire({
      input: "email",
      text: "Your email address",
      inputPlaceholder: "Enter your email address",
    });
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          Swal.fire("Password reset email sent! CHeck your mail");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }
  };

  useEffect(() => {
    setIsLog(true);
  }, []);

  const [isLog, setIsLog] = useState();
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

    if (em && pass && cpass) {
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
                coursePad: false,
                amountPaid: 0,
              };
              await setDoc(doc(db, "Users", user.uid), userData).then(() => {
                Swal.fire(
                  "",
                  "Verification email sent. Please check your inbox.",
                ).then(() => {
                  setSignLoader(false);
                  toLog();
                });
              });
            });
          })
          .catch((err) => {
            setSignLoader(false);

            if (err.code === "auth/email-already-in-use") {
              Swal.fire("", "Email already in use. Try logging in.", "warning");
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
                    "",
                    "Verification email sent. Please check your inbox.",
                  );
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
            <span>Become a Pro in Driving.</span>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Necessitatibus, beatae!
            </p>
            <div className="dots">
              <div className="ld"></div>
              <div className="sd"></div>
              <div className="sd"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="authRight">
        <div className="authRightWrap">
          {isLog ? (
            <div className="authLog">
              <div className="authIntro">
                <h5>NDDA </h5>
                <span>Welcome back,</span>
                <p>Log in to access your account.</p>
              </div>
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
                  <Bouncy size="45" speed="1" color="#00752F"></Bouncy>
                ) : (
                  <button onClick={LogIn}>Log In</button>
                )}
              </div>
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
                <h5> NDDA </h5>
                <span>Create an account.</span>
                <p>Get started, its free!</p>
              </div>
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
                  <Bouncy size="45" speed="1" color="#00752F"></Bouncy>
                ) : (
                  <button onClick={SignUp}>Sign Up</button>
                )}
              </div>
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
