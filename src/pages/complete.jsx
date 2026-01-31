
import certImg from "../media/undraw_certificate_cqps.svg"
import "../css/completetest.css"
import bgPattern from "../media/Screenshot 2026-01-31 145141.png"
import certB from "../media/certB-Photoroom.png"
import newLogo from "../media/authLogo2.png"
import useFBstore from "../store/fbstore"
import Swal from "sweetalert2"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router"

function CompleteTest(){
    const userID = useFBstore((s)=>s.userID)
    const userScore = useFBstore((s)=>s.userScore)
    const username = useFBstore(s=>s.username)
    const navigate = useNavigate()


function getGrade(userScore) {
  if (userScore >= 15) return "A";
  if (userScore >= 14) return "A-";
  if (userScore >= 13) return "B+";
  if (userScore >= 12) return "B";
  if (userScore >= 11) return "B-";
  if (userScore >= 9)  return "C+";
  if (userScore >= 7)  return "C";
  if (userScore >= 5)  return "C-";
  if (userScore >= 3)  return "D";
  return "E"; // 0–2 marks
}


    function getFormattedDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
}
async function downloadCertificate() {

    const certificate = document.getElementById("certWrap");

    const canvas = await html2canvas(certificate, {
        scale: 2,
        useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, (pageHeight - imgHeight) / 2, imgWidth, imgHeight);
    pdf.save("NDDA.pdf"); // Not async, so we simulate a short delay

    // Wait a little to ensure file download starts before uploading
    setTimeout(async () => {
        const blob = await fetch(imgData).then(res => res.blob());
        const file = new File([blob], "certificate.png", { type: "image/png" });
        
        // Move Swal.fire here, inside saveToFirebase success
        await saveToFirebase(file);
    }, 500); // 0.5 second delay
}

async function saveToFirebase(file) {
    try {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("userUID", userID);
        formData.append("date", getFormattedDate());
        formData.append("grade", getGrade(userScore));

        const url = "https://drvingappbackend.onrender.com/savePdf";

        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        console.log(result);

        // Show Swal after Firebase saving is successful
        Swal.fire("Success", "Certificate downloaded!", "success").then(() => {
          navigate("/dashboard")
         });

    } catch (err) {
        console.error(err);
        Swal.fire("Error", "Something went wrong saving the certificate.", "error");
    }
}
    return(
        <div className="completeWrap">
              <div id="certBack">

        <div className="certWrap" id="certWrap">
            <div className="cerTri1">
                 <img src={bgPattern} alt=""/>
            </div>
            <div className="cerTri2">
                <img src={bgPattern} alt=""/>
            </div>
         
            <div className="badge">
                <img src={certB} alt=""/>
            </div>
   
            <div className="certPlacer">
                <div className="certTop">
                    <div className="certLogo">
                        {/* <img width="100px" src={newLogo} alt=""/> */}
                        <h3>NDDA</h3>
                    </div>
                    <div className="certQR">
                      <img width="100px" id="qrImage" src="" alt=""/>
                    </div>
                </div>
                <div className="certMid">
                    <h2>CERTIFICATE <br /> <span>OF COMPLETION</span> </h2>
                    <p>This is to certify that</p>
                    <h3 id="certOwner">{username}</h3>
                    <p>has completed a course on </p>
                    <h3 id="certTopic">Georgia Defensive Driving</h3>
                    <p>on</p>
                    <p id="certDate">{getFormattedDate()}</p>
                 
                </div>

            </div>
        </div>

    </div>
                  <img src={certImg} alt="" />
<h3>Grade: {getGrade(userScore)}</h3>
                  <p>Congratulations on completing the test</p>
                  <button onClick={downloadCertificate}>Donwload Certificate</button>
                

        </div>
    )
}

export default  CompleteTest;