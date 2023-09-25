import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import orangeLogo from "../../Images/Orange_Logo.png"
import { useEffect, useState } from "react";
export function PdfUploader(){
    const [globalFiles,setGlobalFiles]=useState([])
    const [title,setTitle]=useState("")
    const [domain,setDomain]=useState("Information Security")
    const handleStartProcess=async()=>{
        //handle api
    }
    const handleTitleChange=(event)=>{
        setTitle(event.target.value)

    }
    const handleDomainChange=(event)=>{
        
        setDomain(event.target.value)
    }
    useEffect(()=>{
        const dropArea = document.getElementById('file-upload-container');
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        });
    
        ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
        });
    
        ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
        });
    
        dropArea.addEventListener('drop', handleDrop, false);
    
        function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
        }
    
        function highlight() {
        dropArea.classList.add('highlight');
        }
    
        function unhighlight() {
        dropArea.classList.remove('highlight');
        }
    
        function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        setGlobalFiles(files)
        var input=document.getElementById("file-input")
        input.files=files
        handleFiles();
        }
    
    },[])

    function handleFiles() {
    var input=document.getElementById("file-input")
    var files=input.files
    if(files.length!=0){
        setGlobalFiles(files)
        var ul=document.getElementById("uploadedFiles")
        ul.innerHTML=files[0].name
    }else{
        var ul=document.getElementById("uploadedFiles")
        ul.innerHTML=globalFiles[0].name
    }
    // if(ul.children.length!=0){
    //     while(ul.firstChild){
    //         ul.removeChild(ul.lastChild)
    //     }
    // }
    // var li=document.createElement("li")
    // li.innerHTML=globalFiles[0].name
    // ul.appendChild(li)
    }
    return(
        <div className="uploaderMainDiv">
            <div className="LoginLogoDiv">
                <img src={orangeLogo}/>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <div className="uploaderInputsDiv">
            <input className="uploadTitleInput"  type="text" placeholder="Title" onChange={handleTitleChange} />
            
            <div style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"center",alignItems:"center",columnGap:"1vw"}}>
            <label id="demo-simple-select-label" style={{color:"white"}}>Domain: </label>
            <select value={domain} onChange={handleDomainChange} placeholder="Domain" labelId="demo-simple-select-label"  className="uploadSelectInput">
            <option value="Information Security">Information Security</option>
            <option value="Data Protection">Data Protection</option>
            <option value="Csr">Csr</option>

            </select>
            </div>
        
            <div id="file-upload-container" class="drop-area">
            
            <i class="fas fa-file-pdf iconPdf"></i>
            <p style={{color:"white"}} id="uploadedFiles">

            </p>
            
            <div><input onChange={handleFiles} id="file-input" type="file"/> <button class="clickButton">Click here to upload</button> </div>
            
            
          </div>
            </div>
          <button onClick={handleStartProcess} disabled={globalFiles.length==0 || title==""} style={{backgroundColor:globalFiles.length==0? "gray":null}} className="UploadStartBtn">Start Processing</button>
        </div>
        

    )
}