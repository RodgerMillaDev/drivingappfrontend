import { useRef, useState } from "react";
import { Bouncy, Jelly } from "ldrs/react";
import "ldrs/react/Bouncy.css";
import Swal from "sweetalert2";
import "../css/upload.css";
import { db } from "../firebase/firebaseConfig";
import { collection,setDoc,doc } from "firebase/firestore";
function UploadQuestion(){
    const question = useRef(null)
    const a1 = useRef(null)
    const a2 = useRef(null)
    const a3 = useRef(null)
    const a4 = useRef(null)
    const a5 = useRef(null)
    const correctans = useRef(null)
    const [uploadLoder, setuploadLoder] = useState()
    const explanation = useRef(null)


    const uploadQuiz = async ()=>{
        const q = question.current.value;
        const ca = correctans.current.value;
        const exp = explanation.current.value;
        setuploadLoder(true)

        const answers = [a1, a2, a3, a4, a5]
  .map(ref => ref.current.value.trim())
  .filter(val => val !== "");




        const docRef = doc(collection(db,"Questions"))
        await setDoc(docRef, {
              q,
              qId:docRef.id,
              ca,
              answers,
              exp
        }).then(()=>{
            Swal.fire("Question Uplaoded")
            a1.current.value=""
            a2.current.value=""
            a3.current.value=""
            a4.current.value=""
            a5.current.value=""
            question.current.value=""
            correctans.current.value=""
            explanation.current.value=""
            setuploadLoder(false)
        })
    }

    return(
        <div>
            <h4>Upload Quiz</h4>
            <div className="uploadQuizWrap">
                <div className="uploadQuiInput">
                         <p>Question:</p>
                         <input type="text" ref={question} />
                         <p>Answers</p>
                         
                         <input type="text" ref={a1} placeholder="answer1" />
                         <input type="text" ref={a2} placeholder="answer2" />
                         <input type="text" ref={a3} placeholder="answer3" />
                         <input type="text" ref={a4} placeholder="answer4" />
                         <input type="text" ref={a5} placeholder="answer5" />
                         <p>Correct Answer</p>
                         <input type="text" ref={correctans} placeholder="correct ans" />
                         <p>Explanation</p>
                         <input type="text" ref={explanation} placeholder="explanation ans" />

                </div>
                <div className="uploadQuizBtn">
                    {uploadLoder ? (
                  <Bouncy size="45" speed="1" color="#00752F"></Bouncy>

                    ) 
                : 
                (
                    <button onClick={uploadQuiz}>Upload</button>

                )
                }
                </div>
            </div>
        </div>
    )
}
export default UploadQuestion;