import { useState } from "react"
import orangeLogo from "../../Images/Orange_Logo.png"
import "./Login.css"
export function Login(){
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const handleUsernameChange=(event)=>{
        setUsername(event.target.value)
    }
    const handlePasswordChange=(event)=>{
        setPassword(event.target.value)
    }
    const handleLogin=async ()=>{
        // call login api
        //handle cases
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
                        <br></br>
                        <button onClick={handleLogin} className="LoginLoginbtn">Login</button>
                        <a className="LoginforgetPasswordA" href="/forgetpassword">Forget Password</a>

                    </div>

                </div>
            </div>

        </div>

    )
}