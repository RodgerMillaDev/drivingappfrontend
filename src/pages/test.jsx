import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../css/test.css";

import { useEffect, useState } from "react";
import useFBstore from "../store/fbstore";

import { db } from "../firebase/firebaseConfig";
import { Bouncy } from "ldrs/react";
import "ldrs/react/Bouncy.css";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

function Test() {
  const navigate = useNavigate()
  const userID = useFBstore(s => s.userID);
  const [quizIdsArray, setQuizIds] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [score, setScore] = useState(0);
  const setUserScore = useFBstore(s=>s.setUserScore)
  const testStatus = useFBstore((s)=>s.testStatus)
  const [isCorrect, setIsCorrect] = useState(null);




  useEffect(()=>{
     if(testStatus=="active"){

     }else if(testStatus == "completed"){
        navigate("/dashboard")

     }
  },[testStatus])

  const roman = ["i", "ii", "iii", "iv", "v", "vi"];

  /* ---------------- FETCH QUIZZES BY IDS ---------------- */

  const getQuizzesByIds = async (ids) => {
    const results = [];

    for (let i = 0; i < ids.length; i += 10) {
      const q = query(
        collection(db, "Questions"),
        where("qId", "in", ids.slice(i, i + 10))
      );

      const snap = await getDocs(q);
      results.push(...snap.docs.map(d => d.data()));
    }

    return results;
  };


  /* ---------------- REAL-TIME USER LISTENER ---------------- */

  useEffect(() => {
    if (!userID) return;

    const userRef = doc(db, "Users", userID);

    const unsub = onSnapshot(userRef, async snap => {
      const data = snap.data();
      if (!data || !data.quizIds) return;

      setQuizIds(data.quizIds);
      setScore(data.score || 0);
      setUserScore(data.score || 0)
      setCurrentIndex(data.currentIndex || 0);

      if (quizzes.length === 0) {
        const fetched = await getQuizzesByIds(data.quizIds);
        setQuizzes(fetched);
      }

      // restore selected answer if exists
      const qId = data.quizIds[data.currentIndex];
      if (data.quizProgress?.[qId]) {
        setSelectedAnswer(data.quizProgress[qId].selected);
      }
    });

    return () => unsub();
  }, [userID]);

  /* ---------------- SUBMIT ANSWER ---------------- */

const submit = async () => {
  const quiz = quizzes[currentIndex];
  if (!quiz || !selectedAnswer) return;

  setSubmitLoader(true);

  const isAnswerCorrect = selectedAnswer === quiz.ca;
  const ansStatus = isAnswerCorrect ? "CORRECT" : "WRONG";
  const isLastQuestion = currentIndex === quizzes.length - 1;

  const userRef = doc(db, "Users", userID);

  await updateDoc(userRef, {
    [`quizProgress.${quiz.qId}`]: {
      selected: selectedAnswer,
      correct: isAnswerCorrect,
    },
    score: isAnswerCorrect ? score + 1 : score,
    currentIndex: isLastQuestion ? currentIndex : currentIndex + 1,
    quizCompleted: isLastQuestion,
    completedAt: isLastQuestion ? Date.now() : null,
  });

 const statusColor = isAnswerCorrect ? "#12883d" : "#dc2626"; // green / red

await Swal.fire({
  title: `
    Your answer is  <span style="font-weight:700; color:${statusColor}">  ${ansStatus} </span>!
  `,
  html: `
    <p class="swalminititle">Correct Answer</p>
    <p class="swal-text">${quiz.ca}</p>

    <p class="swalminititle">Explanation</p>
    <p class="swal-text">${quiz.exp}</p>
  `,
  confirmButtonText: isLastQuestion ? "View Results" : "Next Question",
  customClass: {
    title: "swal-title",
    htmlContainer: "swal-container",
    confirmButton: "swal-btn",
  },
});

  setIsCorrect(null);
  setSelectedAnswer(null);
  setSubmitLoader(false);

  if (isLastQuestion) {
    console.log("Quiz finished");

    navigate("/completetest");
 
    return;
  }
};

  /* ---------------- UI ---------------- */

  if (!quizzes.length) {
    return (
      <div className="testCont">
        <Navbar />
        <div className="Testloading">
          <Bouncy size="45" speed="1" color="#EB1E26" />
        </div>
        <Footer />
      </div>
    );
  }

  const quiz = quizzes[currentIndex];

  return (
    <div className="testCont">
       
      <Navbar />

      <div className="testWrapPlacer">
        <div className="twpIntro">
          <div className="twpScore">
            <p>Score: {score}/{quizzes.length}</p>
          </div>
        </div>

        <div className="twpQuizWrap">
          <div className="quizQuestion">
            <span>Question {currentIndex + 1}</span>
            <p>{quiz.q}</p>
          </div>

          <div className="quizAnswers">
            {quiz.answers.map((ans, i) => (
              <div
                key={i}
                className={`quizOpt ${
                  selectedAnswer === ans ? "quizOptActive" : ""
                }`}
                onClick={() => {
                  if (isCorrect !== null) return;
                  setSelectedAnswer(ans);
                }}
              >
                <p>{roman[i]}. {ans}</p>
              </div>
            ))}
          </div>

   

          <div className="quizSubmit">
            {!submitLoader ? (
                    <button disabled={!selectedAnswer} onClick={submit}>
                Submit
              </button>
            ) : (
                        <Bouncy size="45" speed="1" color="#EB1E26" />

            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Test;
