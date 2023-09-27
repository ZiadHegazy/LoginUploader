import {  useJwt , isExpired, decodeToken} from "react-jwt";
export const login=async(username,password)=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
    "username": username,
    "password": password
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    const result=await fetch("http://127.0.0.1:8000/forecast/login", requestOptions)
    
    return await result.json()

}
export const checkValidToken=async()=>{
    const access_token=localStorage.getItem("access_token")
    const expired=isExpired(access_token)
    const refresh_token=localStorage.getItem("refresh_token")
    if(expired){
        //const result=await fetch()  refreshtoken API
        // const tokens=await result.json()
        // localStorage.setItem("access_token",tokens.access)
        // localStorage.setItem("refresh_token",tokens.refresh)
    }

}