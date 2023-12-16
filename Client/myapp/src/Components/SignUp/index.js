import { Component } from "react";
import {Link, useHistory} from 'react-router-dom'
import './index.css'

class SignUp extends Component{

    state = {
        message: '',
        statusCode: ''
    }

    SignUp = async(event)=>{

        //API POST REQUEST to server

        event.preventDefault()
        const {username, email, password} = event.target

        const bodyObject = {
            username: username.value,
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
            const sendRequest = await fetch('http://localhost:3001/signUp', options)
            const result = await sendRequest.json()
            this.setState({message: result.message, statusCode: sendRequest.status})
        }catch(error){
            console.error(error)
        }  
    }

    render(){
        const {message, statusCode} = this.state
        const classNames = statusCode === 200 ? 'green': 'red'
        return(
            <div className="form">
                <div className="card">
                <h1 className="heading">Social Feed</h1>
                <form className = "formData" onSubmit={this.SignUp}>
                    <label for="username">Username</label>
                    <input id="username" name = "username" type = "text" required placeholder="Enter your username"/>
                    <label for="email">Email</label>
                    <input id="email" name = "email" type = "email" required placeholder="example@gmail.com"/>
                    <label for="password">Password</label>
                    <input id="password" name = "password" type = "password" required placeholder="Enter Password"/>
                    <button className = "submitButton" type="submit" >Sign Up</button>
                    <p className="paraElement">Already have an Account?<a className="loginLink" href = "/login">Login</a></p>
                    <p className= {`paraElement errMessage ${classNames}`}>{message}</p>
                </form>
                </div>
            </div>
        )
    }
}

export default SignUp