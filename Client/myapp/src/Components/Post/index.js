import Profile from "../Profile"
import PostContents from '../PostContents'
import "./index.css"

const Post = (props)=>{
    const {details} = props
    return(
        <div className = "postCard">
            <Profile userDetails = {details}/>
            <PostContents postDetails = {details}/>
        </div>       
    )
}

export default Post