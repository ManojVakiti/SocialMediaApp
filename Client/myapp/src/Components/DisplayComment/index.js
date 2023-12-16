import './index.css'
import '../Profile/index.css'

const DisplayComment = (props)=>{
    
    const {comments} = props
    const {user,comment,timestamp}= comments
    // const {profilePicture,username}= userDetails
    // console.log(userDetails)
    return(
        <div className='commentBox'>
            <div className='commentDetails'>
                
                    <img src={user.profilePicture} className='image'/>
                <div className='userProfile'>
                    <div className='nameTime'>
                        <p className='username'>{user.username} <span className="comment">{comment}</span></p>
                    </div>
                    <div>
                        <p className="timestamp">{timestamp}</p>
                    </div>
                </div>

                
                
            </div>
            
            
        </div>
    )
}

export default DisplayComment