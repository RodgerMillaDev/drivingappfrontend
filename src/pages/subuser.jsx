
import { Icon } from "@iconify/react"
import "../css/subuser.css"
import "../css/complete.css"
import subUserImg from "../media/undraw_in-the-office_e7pg (2).svg"
import { useEffect,useRef,useState } from "react"
import bgPattern from "../media/redBg1.png"
import certB from "../media/certB-Photoroom.png"
import logo from "../media/ndda-logo.png"
import Swal from "sweetalert2"
import { Bouncy } from "ldrs/react"
import "ldrs/react/Bouncy.css";
import html2canvas from "html2canvas"
import cert from "../media/certificaten.avif"
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router"



export default  function Subuser(){


    const signNm = useRef(null) 
    const signEm = useRef(null) 
    const navigate = useNavigate()
    const [subUserLoader,setSubuserLoader] = useState()
    const [subUserUID,setsubUserUID] = useState("")
    const [subUserName,setsubUserName] = useState("")
const genCertUser = async (file) => {
  const fn = signNm.current.value;
  const em = signEm.current.value;

  if (!fn || !em || !file) {
    Swal.fire("", "Oops! Looks like you missed a field", "warning");
    return;
  }

  setSubuserLoader(true);

  try {
    const formData = new FormData();
    formData.append("userName", fn);
    formData.append("userEm", em);
    formData.append("grade", "A");
    formData.append("date", getFormattedDate());
    formData.append("image", file);

    const response = await fetch(
      "https://drvingappbackend.onrender.com/saveTopdfAdmin",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    console.log(result);

    Swal.fire(
      "Success",
      `You've successfully generated ${fn}'s certificate`,
      "success"
    );

    signEm.current.value = "";
    signNm.current.value = "";

  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Something went wrong saving the certificate.", "error");
  } finally {
    setSubuserLoader(false);
  }
};

    function getFormattedDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = today.getFullYear();

    return `${month}/${day}/${year}`;
}
async function downloadCertificate(userName) {
  const em = signEm.current.value?.trim(); // 👈 check email
  setsubUserName(userName);

  document.getElementById("newcertusername").innerText = userName;
  const certificate = document.getElementById("certWrap");

  const canvas = await html2canvas(certificate, {
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth - 20;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(
    imgData,
    "PNG",
    10,
    (pageHeight - imgHeight) / 2,
    imgWidth,
    imgHeight
  );

  // ✅ ALWAYS download certificate
  pdf.save("NDDA.pdf");

  // ❌ If email is empty → STOP here
  if (!em) {
    Swal.fire(
      "Certificate Downloaded",
      "Certificate downloaded successfully (no account created).",
      "success"
    );
    return;
  }

  // ✅ Email exists → upload/save to backend
  setSubuserLoader(true);

  setTimeout(async () => {
    const blob = await fetch(imgData).then((res) => res.blob());
    const file = new File([blob], "certificate.png", {
      type: "image/png",
    });

    await genCertUser(file);
    setSubuserLoader(false);
  }, 500);
}

function getCertNumber() {
    // Use last 6 digits of timestamp
    return parseInt(Date.now().toString().slice(-6));
}
    return(
        
        <section className="subUserSection">
        <div id="certBack">

        <div className="certWrap" id="certWrap">

            <img src={cert} alt="" />
            <p className="newcertusername" id="newcertusername">{subUserName}</p>
            <p className="newcertDate newcertDateSubUser">{getFormattedDate()}</p>

           <p className="newcertNumber">{getCertNumber()}</p>
     
            
        </div>

    </div>
    <div className="subUserWrap">
           <div className="subUserPlcer">
            <div className="subUserCont">
                <img src={subUserImg} alt="" />
                <h3>Generate User Certificate</h3>
                <p>To generate user certificate, an account will also be created.</p>
                <div className="subUserInputs">
                   <div className="suInputWrap">
  <div className="suinIcon">
    <Icon className="faIcon" icon="solar:user-rounded-bold" />
  </div>

  <div className="suInputAct">
    <input
      type="text"
      ref={signNm}
      placeholder="User full name"
      onChange={(e) => {
        let value = e.target.value;

        // Normalize spaces
        value = value.replace(/\s+/g, " ").trimStart();

        // Split into words
        const words = value.split(" ");

        // Allow only first 3 names
        if (words.length <= 3) {
          e.target.value = value;
        } else {
          e.target.value = words.slice(0, 3).join(" ");
        }
      }}
    />
  </div>
</div>

                    <div className="suInputWrap">
                        <div className="suinIcon">
                             <Icon className="faIcon" icon="solar:letter-bold" />
                        </div>
                        <div className="suInputAct">
                            <input type="email" ref={signEm} placeholder="User email" />
                        </div>
                    </div>
                    <div className="suInputWrapBtn">
                        {subUserLoader ? (
                  <Bouncy size="45" speed="1" color="#EB1E26"></Bouncy>

                             
                        ): ( <button onClick={() => downloadCertificate(signNm.current.value)}>
  Generate Certificate
</button>
)}
                    </div>
                </div>
            </div>
           </div>
        </div>
        </section>

        
    )
}