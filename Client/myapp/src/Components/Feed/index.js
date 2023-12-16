import { Component } from "react"
import { Redirect } from "react-router-dom"
import { AuthComponent } from "../AuthComponent"
import {FaPlus, FaDeleteLeft} from 'react-icons/fa6'
import Post from "../Post"
import PostPopUp from '../CreatePost/'
import Popup from "reactjs-popup"
import './index.css'
import Cookies from "js-cookie"

const dummyData = {
    user: {
        profilePicture: 'https://img.freepik.com/free-photo/stylish-indian-businessman-formal-wear-posed-street_627829-13217.jpg?w=900&t=st=1695390003~exp=1695390603~hmac=63776cdbdc753be0a1ee540f6a1d1f0fa0dd32f35eeb3a2200fb030e94fa4eba',
        username: 'Cherry',
    }, 
    postContent: {
        caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        image: 'https://img.freepik.com/free-photo/portrait-handsome-serious-man_23-2149022626.jpg?w=996&t=st=1695396328~exp=1695396928~hmac=25f11f6b866a3e94ac12404ea0bb2a24b35843535941b6fc9475bdf7b13e2898',
        timestamp: '202002020'
    },
    likes: 25,
    comments: [
        {
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/portrait-handsome-serious-man_23-2149022626.jpg?w=996&t=st=1695396328~exp=1695396928~hmac=25f11f6b866a3e94ac12404ea0bb2a24b35843535941b6fc9475bdf7b13e2898',
                username: 'Jack'
            },
            comment: 'Great!',
            timestamp: '2020020'
        },
        {
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/portrait-handsome-serious-man_23-2149022626.jpg?w=996&t=st=1695396328~exp=1695396928~hmac=25f11f6b866a3e94ac12404ea0bb2a24b35843535941b6fc9475bdf7b13e2898',
                username: 'Harris Rauf'
            },
            comment: 'Great!',
            timestamp: '2020020'
        }
    ]
}

const dummyArr = [{
    user: {
        profilePicture: 'https://img.freepik.com/free-photo/stylish-indian-businessman-formal-wear-posed-street_627829-13217.jpg?w=900&t=st=1695390003~exp=1695390603~hmac=63776cdbdc753be0a1ee540f6a1d1f0fa0dd32f35eeb3a2200fb030e94fa4eba',
        username: 'Cherry',
    }, 
    postContent: {
        caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        image: 'https://img.freepik.com/free-photo/portrait-handsome-serious-man_23-2149022626.jpg?w=996&t=st=1695396328~exp=1695396928~hmac=25f11f6b866a3e94ac12404ea0bb2a24b35843535941b6fc9475bdf7b13e2898',
        timestamp: '202002020'
    },
    likes: 25,
    comments: [

    ]
}, {
    user: {
        profilePicture: 'https://img.freepik.com/free-photo/stylish-indian-businessman-formal-wear-posed-street_627829-13217.jpg?w=900&t=st=1695390003~exp=1695390603~hmac=63776cdbdc753be0a1ee540f6a1d1f0fa0dd32f35eeb3a2200fb030e94fa4eba',
        username: 'Cherry',
    }, 
    postContent: {
        caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        image: 'https://img.freepik.com/free-photo/portrait-handsome-serious-man_23-2149022626.jpg?w=996&t=st=1695396328~exp=1695396928~hmac=25f11f6b866a3e94ac12404ea0bb2a24b35843535941b6fc9475bdf7b13e2898',
        timestamp: '202002020'
    },
    likes: 25,
    comments: [
        {
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.2091056332.1695389987&semt=sph',
                username: 'Jack'
            },
            comment: 'Wowo wounderful amazing zing zing ',
            timestamp: '2020020'
        },
        {
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/stylish-handsome-indian-man-tshirt-pastel-wall_496169-1571.jpg?w=900&t=st=1695407794~exp=1695408394~hmac=143eeeab5811021c3d0bc13e30ebdae89a55116f8283738bfd71061a0c41be04',
                username: 'Harris Rauf'
            },
            comment: 'Wowo wounderful amazing zing zing ',
            timestamp: '2020020'
        },
        {
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/stylish-handsome-indian-man-tshirt-pastel-wall_496169-1571.jpg?w=900&t=st=1695407794~exp=1695408394~hmac=143eeeab5811021c3d0bc13e30ebdae89a55116f8283738bfd71061a0c41be04',
                username: 'Harris Rauf'
            },
            comment: 'Wowo wounderful amazing zing zing ',
            timestamp: '2020020'
        }
    ]
}, {
    user: {
        profilePicture: 'https://img.freepik.com/free-photo/stylish-indian-businessman-formal-wear-posed-street_627829-13217.jpg?w=900&t=st=1695390003~exp=1695390603~hmac=63776cdbdc753be0a1ee540f6a1d1f0fa0dd32f35eeb3a2200fb030e94fa4eba',
        username: 'Cherry',
    }, 
    postContent: {
        caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        image: 'https://img.freepik.com/free-photo/portrait-handsome-serious-man_23-2149022626.jpg?w=996&t=st=1695396328~exp=1695396928~hmac=25f11f6b866a3e94ac12404ea0bb2a24b35843535941b6fc9475bdf7b13e2898',
        timestamp: '202002020'
    },
    likes: 25,
    comments: [
        {
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/young-handsome-man-holding-chess-looking-positive-happy-standing-smiling-with-confident-smile-showing-teeth_839833-13590.jpg?w=1060&t=st=1695477563~exp=1695478163~hmac=a660c171fca80d81d32e577afb81154001b583240475c6e7d3c4313ea2715b4a',
                username: 'Jack'
            },
            comment: 'Wowo wounderful amazing zing zing ',
            timestamp: '2020020'
        },
        {
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/young-handsome-man-holding-chess-looking-positive-happy-standing-smiling-with-confident-smile-showing-teeth_839833-13590.jpg?w=1060&t=st=1695477563~exp=1695478163~hmac=a660c171fca80d81d32e577afb81154001b583240475c6e7d3c4313ea2715b4a',
                username: 'Harris Rauf'
            },
            comment: 'Wowo wounderful amazing zing zing ',
            timestamp: '2020020'
        },{
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/young-handsome-man-holding-chess-looking-positive-happy-standing-smiling-with-confident-smile-showing-teeth_839833-13590.jpg?w=1060&t=st=1695477563~exp=1695478163~hmac=a660c171fca80d81d32e577afb81154001b583240475c6e7d3c4313ea2715b4a',
                username: 'Jack'
            },
            comment: 'Wowo wounderful amazing zing zing ',
            timestamp: '2020020'
        },{
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/young-handsome-man-holding-chess-looking-positive-happy-standing-smiling-with-confident-smile-showing-teeth_839833-13590.jpg?w=1060&t=st=1695477563~exp=1695478163~hmac=a660c171fca80d81d32e577afb81154001b583240475c6e7d3c4313ea2715b4a',
                username: 'Jack'
            },
            comment: 'Wowo wounderful amazing zing zing ',
            timestamp: '2020020'
        },{
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/young-handsome-man-holding-chess-looking-positive-happy-standing-smiling-with-confident-smile-showing-teeth_839833-13590.jpg?w=1060&t=st=1695477563~exp=1695478163~hmac=a660c171fca80d81d32e577afb81154001b583240475c6e7d3c4313ea2715b4a',
                username: 'Jack'
            },
            comment: 'Wowo wounderful amazing zing zing ',
            timestamp: '2020020'
        },{
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/young-handsome-man-holding-chess-looking-positive-happy-standing-smiling-with-confident-smile-showing-teeth_839833-13590.jpg?w=1060&t=st=1695477563~exp=1695478163~hmac=a660c171fca80d81d32e577afb81154001b583240475c6e7d3c4313ea2715b4a',
                username: 'Jack'
            },
            comment: 'Wowo wounderful amazing zing zing ',
            timestamp: '2020020'
        },{
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/young-handsome-man-holding-chess-looking-positive-happy-standing-smiling-with-confident-smile-showing-teeth_839833-13590.jpg?w=1060&t=st=1695477563~exp=1695478163~hmac=a660c171fca80d81d32e577afb81154001b583240475c6e7d3c4313ea2715b4a',
                username: 'Jack'
            },
            comment: 'Wowo wounderful amazing zing zing ',
            timestamp: '2020020'
        }, {
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/young-handsome-man-holding-chess-looking-positive-happy-standing-smiling-with-confident-smile-showing-teeth_839833-13590.jpg?w=1060&t=st=1695477563~exp=1695478163~hmac=a660c171fca80d81d32e577afb81154001b583240475c6e7d3c4313ea2715b4a',
                username: 'Jack'
            },
            comment: 'Wowo wounderful amazing zing zing ',
            timestamp: '2020020'
        },
        {
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/young-handsome-man-holding-chess-looking-positive-happy-standing-smiling-with-confident-smile-showing-teeth_839833-13590.jpg?w=1060&t=st=1695477563~exp=1695478163~hmac=a660c171fca80d81d32e577afb81154001b583240475c6e7d3c4313ea2715b4a',
                username: 'Harris Rauf'
            },
            comment: 'Wowo wounderful amazing zing zing ',
            timestamp: '2020020'
        },{
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/young-handsome-man-holding-chess-looking-positive-happy-standing-smiling-with-confident-smile-showing-teeth_839833-13590.jpg?w=1060&t=st=1695477563~exp=1695478163~hmac=a660c171fca80d81d32e577afb81154001b583240475c6e7d3c4313ea2715b4a',
                username: 'Jack'
            },
            comment: 'Wowo wounderful amazing zing zing ',
            timestamp: '2020020'
        },{
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/young-handsome-man-holding-chess-looking-positive-happy-standing-smiling-with-confident-smile-showing-teeth_839833-13590.jpg?w=1060&t=st=1695477563~exp=1695478163~hmac=a660c171fca80d81d32e577afb81154001b583240475c6e7d3c4313ea2715b4a',
                username: 'Jack'
            },
            comment: 'Wowo wounderful amazing zing zing ',
            timestamp: '2020020'
        },{
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/young-handsome-man-holding-chess-looking-positive-happy-standing-smiling-with-confident-smile-showing-teeth_839833-13590.jpg?w=1060&t=st=1695477563~exp=1695478163~hmac=a660c171fca80d81d32e577afb81154001b583240475c6e7d3c4313ea2715b4a',
                username: 'Jack'
            },
            comment: 'Wowo wounderful amazing zing zing ',
            timestamp: '2020020'
        },{
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/young-handsome-man-holding-chess-looking-positive-happy-standing-smiling-with-confident-smile-showing-teeth_839833-13590.jpg?w=1060&t=st=1695477563~exp=1695478163~hmac=a660c171fca80d81d32e577afb81154001b583240475c6e7d3c4313ea2715b4a',
                username: 'Jack'
            },
            comment: 'Wowo wounderful amazing zing zing ',
            timestamp: '2020020'
        },{
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/young-handsome-man-holding-chess-looking-positive-happy-standing-smiling-with-confident-smile-showing-teeth_839833-13590.jpg?w=1060&t=st=1695477563~exp=1695478163~hmac=a660c171fca80d81d32e577afb81154001b583240475c6e7d3c4313ea2715b4a',
                username: 'Jack'
            },
            comment: 'Wowo wounderful amazing zing zing ',
            timestamp: '2020020'
        }, {
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/young-handsome-man-holding-chess-looking-positive-happy-standing-smiling-with-confident-smile-showing-teeth_839833-13590.jpg?w=1060&t=st=1695477563~exp=1695478163~hmac=a660c171fca80d81d32e577afb81154001b583240475c6e7d3c4313ea2715b4a',
                username: 'Jack'
            },
            comment: 'Wowo wounderful amazing zing zing ',
            timestamp: '2020020'
        },
        {
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/young-handsome-man-holding-chess-looking-positive-happy-standing-smiling-with-confident-smile-showing-teeth_839833-13590.jpg?w=1060&t=st=1695477563~exp=1695478163~hmac=a660c171fca80d81d32e577afb81154001b583240475c6e7d3c4313ea2715b4a',
                username: 'Harris Rauf'
            },
            comment: 'Wowo wounderful amazing zing zing ,Wowo wounderful amazing zing zing,Wowo wounderful amazing zing zing',
            timestamp: '2020020'
        },{
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/young-handsome-man-holding-chess-looking-positive-happy-standing-smiling-with-confident-smile-showing-teeth_839833-13590.jpg?w=1060&t=st=1695477563~exp=1695478163~hmac=a660c171fca80d81d32e577afb81154001b583240475c6e7d3c4313ea2715b4a',
                username: 'Jack'
            },
            comment: 'Wowo wounderful amazing zing zing ',
            timestamp: '2020020'
        },{
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/young-handsome-man-holding-chess-looking-positive-happy-standing-smiling-with-confident-smile-showing-teeth_839833-13590.jpg?w=1060&t=st=1695477563~exp=1695478163~hmac=a660c171fca80d81d32e577afb81154001b583240475c6e7d3c4313ea2715b4a',
                username: 'Jack'
            },
            comment: 'Wowo wounderful amazing zing zing ',
            timestamp: '2020020'
        },{
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/young-handsome-man-holding-chess-looking-positive-happy-standing-smiling-with-confident-smile-showing-teeth_839833-13590.jpg?w=1060&t=st=1695477563~exp=1695478163~hmac=a660c171fca80d81d32e577afb81154001b583240475c6e7d3c4313ea2715b4a',
                username: 'Jack'
            },
            comment: 'Wowo wounderful amazing zing zing ',
            timestamp: '2020020'
        },{
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/young-handsome-man-holding-chess-looking-positive-happy-standing-smiling-with-confident-smile-showing-teeth_839833-13590.jpg?w=1060&t=st=1695477563~exp=1695478163~hmac=a660c171fca80d81d32e577afb81154001b583240475c6e7d3c4313ea2715b4a',
                username: 'Jack'
            },
            comment: 'Wowo wounderful amazing zing zing ',
            timestamp: '2020020'
        },{
            user: {
                profilePicture: 'https://img.freepik.com/free-photo/young-handsome-man-holding-chess-looking-positive-happy-standing-smiling-with-confident-smile-showing-teeth_839833-13590.jpg?w=1060&t=st=1695477563~exp=1695478163~hmac=a660c171fca80d81d32e577afb81154001b583240475c6e7d3c4313ea2715b4a',
                username: 'Jack'
            },
            comment: 'Wowo wounderful amazing zing zing Wowo wounderful amazing zing zing Wowo wounderful amazing zing zing Wowo wounderful amazing zing zing Wowo wounderful amazing zing zing Wowo wounderful amazing zing zing Wowo wounderful amazing zing zing Wowo wounderful amazing zing zing Wowo wounderful amazing zing zing Wowo wounderful amazing zing zing Wowo wounderful amazing zing zing Wowo wounderful amazing zing zing ',
            timestamp: '2020020'
        }
    ]
}]

class Feed extends Component{
    state = {
        feedData: []
    }

    getDetails = async ()=>{
            //getting post Details
        try{
            console.log("Getting Details")
            const token = Cookies.get('access_token')
            const options = {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            const request = await fetch('http://localhost:3001/getPosts', options)
            const arr = await request.json()
            this.setState({feedData: arr.posts})
            console.log("refreshed")
        }catch(e){

        }
    }

    async componentDidMount(){
        await this.getDetails()
    }

    changeState = async()=>{
        await  this.getDetails()
    }

    render(){
        const {feedData} = this.state
        const auth = AuthComponent()
        //auth.message === "success"
        if(true){
            return(
                <div className="feedContainer">
                    
                    <div className="topBar">
                    {/* <h1 className="feedHeading">Feed Page</h1> */}
                    <div className="createButtonBox">
                    <div className='containerDiv'>
                <div className="popup-container">
                            <Popup modal trigger={<button className="createButton"><FaPlus/></button>}>
                                {close => (
                                <>
                                    <div className='darkBackground'> <button type="button" className="trigger-button" onClick={() => close()}>
                                    <FaDeleteLeft style = {{color: 'white', fontSize: '20px'}}/>
                                    </button>
                                        <div className='backgroundPopUp'>
                                            {/* //Create Post Component */}
                                            <PostPopUp changeState = {this.changeState}/>
                                        </div>
                                        {/* //comment Box  */}
                                        <div>
                                        </div>
                                        
                                    </div>
                                     
                                </>
                                )}
                            </Popup>
                            </div>
                    
                            <p className="addPost">Add a Post</p>
                </div>    
                    </div>
                        {/* <input type="text"/> */}

                    </div>
                    <div className="postsContainer">
                        <div className="post">
                            {feedData.map((eachItem)=>{
                                return <Post details={eachItem}/>
                            })}
                        </div>
                    </div>
                </div>
            )
        }else{
            return <Redirect to = "/login"/>
        }
       
    }
}

export default Feed