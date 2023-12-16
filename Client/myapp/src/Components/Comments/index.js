import DisplayComment from "../DisplayComment"
import './index.css'

const Comments = (props)=>{
    const {commentDetails,userDetails,caption} = props
    const {profilePicture,username} = userDetails
    return(
        <div>
            <div className="user">
                <img src={profilePicture} className="image"/>
                <h3>{username}</h3>
        </div>
            <div className="commentsContainer">
            {commentDetails.map((eachComment)=>{
                return <DisplayComment key = {eachComment.comment_id} comments={eachComment}/>
            })}
            </div>   
        </div>
    )
}

export default Comments