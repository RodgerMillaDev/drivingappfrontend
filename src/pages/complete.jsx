
import certImg from "../media/undraw_certificate_cqps.svg"
import "../css/completetest.css"
import bgPattern from "../media/redBg1.png"
import cert from "../media/certificaten.avif"
import logo from "../media/ndda-logo.png"
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

    return `${month}/${day}/${year}`;
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

        const url = "https://drvingappbackend-ix55.onrender.com/savePdf";

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


function getCertNumber() {
    // Use last 6 digits of timestamp
    return parseInt(Date.now().toString().slice(-6));
}
    return(
        <div className="completeWrap">
              <div id="certBack">

      <div className="certWrap" id="certWrap">

            <img src={cert} alt="" />
            <p className="newcertusername" id="newcertusername">{username}</p>
            <p className="newcertDate">{getFormattedDate()}</p>
                <p className="newcertNumbercomplete">{getCertNumber()}</p>

            
        </div>

    </div>
                  <img src={certImg} alt="" />
<h3>Grade: {getGrade(userScore)}</h3>
                  <p>Congratulations on completing the test</p>
                  <button onClick={downloadCertificate}>Download Certificate</button>
                
        </div>
    )
}

export default  CompleteTest;