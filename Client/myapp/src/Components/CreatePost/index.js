import Popup from 'reactjs-popup';
import {FaCirclePlus} from 'react-icons/fa6'
import {storage} from '../Firebase/firebase.js'
import {getDownloadURL, ref, uploadBytes, listAll} from 'firebase/storage'
import Cookies from 'js-cookie';
import { useState } from 'react';
import './index.css'
import '../PostContents/index.css'
import {format, } from 'date-fns';

const PostPopUp = (props)=>{
    const [file, setFile] = useState(null)
    const [downloadedUrl, setDownloadedUrl] = useState(null)
    const [captionText, setCaptionText] = useState(null)
    const {changeState} = props
    const changeFile = async(event)=>{
        const files = event.target.files[0];
        if(files){
            setFile(files)
            const imageRef = ref(storage, `posts/${files.name}`)
                 try{
                        const result = await uploadBytes(imageRef, files)
                        const download = await getDownloadURL(imageRef);
                        setDownloadedUrl(download)
                 }catch(e){

                 }
        }
    }

    const sendPostRequest = async(downloadUrl)=>{
        const token = Cookies.get('access_token')
        const date = new Date()
        const formatedDate = format(date, 'd MMMM yyyy HH:mm:ss')
        const obj = {
            image : downloadedUrl,
            caption: captionText,
            timestamp: formatedDate
        }
    
        const options = {
            method : "POST",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(obj)
        }
        const request = await fetch('http://localhost:3001/createPost', options)
        
    }

    

    const submitFile = ()=>{
        console.log("first statement")
        sendPostRequest()
        changeState()
        console.log("second statement")
    }

    const changeText = (event)=>{
        setCaptionText(event.target.value)
    }

    return( 
        <div className='containerPost'>
            <h1 className='postHeading'>Create a new post</h1>
            <div className='createPostContainer'>
                <input onChange = {changeFile} id = "fileInput" placeholder = "select a file" className = "inputFile" type = "file"/>
                <div className= {`labelContainer ${downloadedUrl !== null ? 'transparent': ''}`}>
                    {downloadedUrl !== null ? <img className='imageStylingA' src = {downloadedUrl} alt = "imageUploaded"/>: 
                        <>
                        <label className = "label" htmlFor='fileInput'><FaCirclePlus style = {{fontSize: '36px', color: 'green'}}/></label>
                        <p className='selectImagepara'>Select an image</p>
                        </>
                    }
                </div>
                <div className='postButtonContainer'>
                <textarea onChange = {changeText} className='textarea commentInput' placeholder= "Please write a caption here..."></textarea>
                <button className='PostButtonA' onClick = {submitFile}>Post</button>
                </div>
                
            </div>
           
        </div>
    )
}


export default PostPopUp