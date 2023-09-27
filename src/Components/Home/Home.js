import { useNavigate } from "react-router-dom"
import orangeLogo from "../../Images/Orange_Logo.png"
import "./Home.css"
export function Home(){
    const navigate=useNavigate()
    return(
        <div className="HomeMainDiv">
            <div className="LoginLogoDiv">
                <img src={orangeLogo}/>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="HomeOptionsDiv">
                <h1>Choose what you want to upload</h1>
                <button onClick={()=>navigate("/excelUpload")} className="UploadBtnChoice"> <i className="fas fa-file-excel iconExcel"></i> Excel Upload</button>
                <button onClick={()=>navigate("/pdfUpload")} className="UploadBtnChoice"> <i className="fas fa-file-pdf iconPdf"></i> PDF Upload</button>


            </div>

        </div>

    )
}