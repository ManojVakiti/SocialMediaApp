import Popup from 'reactjs-popup';
import { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {FaHeart, FaRegCommentDots, FaRegHeart, FaShareNodes, FaDeleteLeft} from 'react-icons/fa6'
import Cookies from 'js-cookie';
import { format } from 'date-fns';
import Comments from '../Comments'
import './index.css'

const PostContents = (props)=>{
    const {postDetails} = props
    const {postContent, comments, isLiked, likes} = postDetails
    const {caption, image, post_id} = postContent
    const {user} = postDetails
    const [commentText, setCommentText] = useState()
    const [commentsArray, setCommentsArray] = useState(comments)
    const [liked, setLiked] = useState(false)
    const [noOfLikes, setLikes] = useState(likes)

    useEffect(()=>{
        if(isLiked){
            setLiked(true)
            console.log(likes)
        }
    }, [])

    const uploadComment = async()=>{
        //send post request to the store the comment
        const date = new Date()
        const formatedDate = format(date, 'd MMMM yyyy HH:mm:ss')

        const obj = {
            comment: commentText,
            post_id: post_id,
            timestamp: formatedDate
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${Cookies.get('access_token')}`
            }, body: JSON.stringify(obj)
        }
        const request = await fetch("http://localhost:3001/saveComment", options)
        const result = await request.json()
        setCommentsArray(comments.push(result))
    }

    const changeLikeState = async()=>{
        if(liked){
            //delete like
            setLiked(false)
            setLikes(noOfLikes - 1)
            const obj = {
                post_id: post_id,
            }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${Cookies.get('access_token')}`
                }, body: JSON.stringify(obj)
            }
            const request = await fetch('http://localhost:3001/deleteLike', options)
        }else{
            //add like to the post
            setLiked(true)
            setLikes(noOfLikes + 1)
            const obj = {
                post_id: post_id,
            }

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${Cookies.get('access_token')}`
                }, body: JSON.stringify(obj)
            }
            const request = await fetch('http://localhost:3001/addLike', options)
        }
    }

    return(
        <div className='postContents'>
            <div className='imagePostContainer'>
                {image !== 'null' ? <img className = "imagePost" src = {image}/>: null}
            </div>
            <div>
            <h1 className='caption'>{caption}</h1>
            </div>
            <div className='likesAndCommentsContainer'>
                <div className='containerDiv'>
                    <button className = "likeButton" onClick = {changeLikeState}>
                        {liked ? <FaHeart style = {{color: "red", fontSize: '22px'}} className='iconStyling'/>: <FaRegHeart style = {{color: "red", fontSize: '22px'}} className='iconStyling'/>}
                    </button>
                    <p className='likesPara'>{noOfLikes} Likes</p>
                </div>
                <div className='containerDiv'>
                <div className="popup-container">
                            <Popup modal trigger={<button className='buttonComment'><FaRegCommentDots className='iconStyling'/></button>}>
                                {close => (
                                <>
                                    <div className='darkBackground'> <button type="button" className="trigger-button" onClick={() => close()}>
                                        <FaDeleteLeft style = {{color: 'white', fontSize: '20px'}}/>
                                    </button>
                                        <div className='backgroundPopUp'>
                                            <Comments commentDetails= {comments} userDetails={user} caption={caption}/>
                                        </div>
                                        {/* //comment Box  */}
                                        <div>
                                        </div>
                                        <div className='commentInputBox'>
                                            {/* <input placeholder = "Add a Comment...." type="text" className='commentInput'/> */}
                                            <textarea onChange = {(event)=>{setCommentText(event.target.value)}} rows = "4" cols = "5" className='commentInput' placeholder='Add a Comment'></textarea>
                                            <button onClick = {uploadComment} className="postButton">Post</button>
                                        </div>
                                    </div>
                                     
                                </>
                                )}
                            </Popup>
                            </div>
                    
                    <p>Comments</p>
                </div>
                <div className='containerDiv'>
                    <FaShareNodes className='iconStyling'/>
                    <p>Share</p>
                </div>
            </div>
            
        </div>
        
    )
}

export default PostContents