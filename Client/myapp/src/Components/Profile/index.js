import './index.css'
const Profile = (props)=>{
    const {userDetails} = props
    const {user} = userDetails
    const {postContent} = userDetails
    const {profilePicture,username} = user
    const {timestamp} = postContent
    // console.log(userDetails)

    return(
        <div className='profileContainer'>
            <img src={profilePicture} className='image'/>
            <div>
                <h3>{username}</h3>
                <p className='timeStamp'>{timestamp}</p>
            </div>
            <div className='buttonContainer'>
                <button><img className = "threeDots" src = "https://cdn.vectorstock.com/i/preview-1x/33/03/three-horizontal-dots-menu-dark-mode-glyph-ui-icon-vector-43353303.jpg"/></button>
            </div>
        </div>
         
    )
}

export default Profile 