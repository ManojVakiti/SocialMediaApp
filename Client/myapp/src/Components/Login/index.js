import { Component } from "react";
import Cookies from 'js-cookie';
import '../SignUp/index.css'

class Login extends Component{

    state = {
        message: "",
        status : ""
    }

    Login = async (event)=>{
        event.preventDefault()
        const {email, password} = event.target
        //API POST REQUEST 

        const bodyObject = {
            email: email.value,
            password: password.value
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyObject)
        }
        try{
            const sendRequest = await fetch('http://localhost:3001/login', options)
            const result = await sendRequest.json()
            const message = result.message
            const statusCode = sendRequest.status
            //store the token if logged in successfully
            if(statusCode === 200){
                Cookies.set("access_token", result.token, {expires: 1})
            }
            this.setState({message,status: statusCode })

        }catch(error){
            console.error(error)
        } 

    }  
    render(){
        const {message,status} = this.state
        const classNames = status === 200 ? "green":"red"
        return(
            <div className="form">
                <div className="card">
                <h1 className="heading">Social Feed</h1>
                <form className = "formData" onSubmit={this.Login}>
                    <label for="email">Email</label>
                    <input id="email" name = "email" type = "email" required placeholder="Enter your email"/>
                    <label for="password">Password</label>
                    <input id="password" name = "password" type = "password" required placeholder="Enter Password"/>
                    <button className = "submitButton" type="submit" >Login</button>
                    <p className="paraElement">Not yet Registered? <a className="loginLink" href = "/signup">SignUp</a> </p>
                    <p className = {`${classNames} paraElement`}>{message}</p>
                </form>
                </div>
            </div>
        )
    }
}

export default Login