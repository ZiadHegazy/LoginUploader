import { useState } from "react"
import orangeLogo from "../../Images/Orange_Logo.png"
import "./Login.css"
import { login } from "../../API/LoginApi"
import {  useJwt , isExpired, decodeToken} from "react-jwt";
import { useNavigate } from "react-router-dom";
export function Login(){
    const navigate=useNavigate()
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [data, setData] = useState({add:{Q1:[1,2,3],Q2:[],Q3:[]}});
    const [showError,setShowError]=useState(false)
    const handleUsernameChange=(event)=>{
        setUsername(event.target.value)
    }
    const handlePasswordChange=(event)=>{
        setPassword(event.target.value)
    }
    const handleLogin=async ()=>{
        // call login api
        //handle cases
        try{

            const result=await login(username,password)
            localStorage.setItem("access_token",result.access_token)
            localStorage.setItem("refresh_token",result.refresh_token)
            navigate("/home")
        }catch{
            setShowError(true)

        }
        
        
    }
    
    return(
        <div className="LoginMainDiv">
            <div className="LoginLogoDiv">
                <img src={orangeLogo}/>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="LoginWelcomeDiv">
                <div className="LoginInputsDiv">
                    {/* <img style={{width:"100%",height:"100%",position:"fixed",top:"0px"}} src={backgroundImage}/> */}
                    <div className="LoginInputs">
                    <label className="LoginWelcomeLabel">Welcome</label>
                        <input onChange={handleUsernameChange} className="LoginInputFields" placeholder="Username" type="text"/>
                        <input onChange={handlePasswordChange} className="LoginInputFields" placeholder="Password" type="password"/>
                        {showError && <label style={
                            {color:"red"}
                        }>Wrong Username or Password</label>}
                        <br></br>
                        <button onClick={handleLogin} className="LoginLoginbtn">Login</button>
                        <a className="LoginforgetPasswordA" href="/forgetpassword">Forget Password</a>

                    </div>

                </div>
            </div>

        </div>

    )
}