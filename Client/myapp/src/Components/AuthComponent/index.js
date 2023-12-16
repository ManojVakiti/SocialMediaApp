import jwt_decode from "jwt-decode";
import Cookies from "js-cookie"


export const AuthComponent = ()=>{
    const token = Cookies.get('access_token')
    let obj 
    try{
        const payload = jwt_decode(token)
        obj = {
            message: 'success',
            payload
        }
        return (obj)
    }catch(e){
        obj = {
            message: 'Invalid Token'
        }
        return(obj)
    }
}

