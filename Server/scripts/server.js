const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const {open} = require("sqlite")
const sqlite3 = require("sqlite3")
const path = require("path")
const jsonwebtoken = require('jsonwebtoken')

const app = express()

app.use(cors())
app.use(express.json())

let db

const intiliazeDb = async ()=>{
    try{
        const filePath = path.join(__dirname, "data.db")
        db = await open({
            filename: filePath,
            driver: sqlite3.Database
        })

        app.listen(3001, ()=>{
            console.log("Listening port 3001")
            dataIn()
        })
        
    }catch(error){
        console.log("Error")
    }
}

intiliazeDb();



app.post('/signUp', async(request, response)=>{
    const {body} = request
    const {username, email, password} = body
    const hashedPassword = await bcrypt.hash(password, 10)
    const selectQuery = `SELECT * FROM users WHERE email = '${email}'`
    const arr = await db.get(selectQuery)
    const imageUrl = 'https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg'
    let result
    if(arr === undefined){
        const query = `INSERT INTO users(username, email, password, profilePicture) VALUES('${username}', '${email}', '${hashedPassword}', '${imageUrl}')`;
        await db.run(query)
         result = {
            message: 'Registered Successfully'
        }
        response.status(200)
    }else{
        result = {
            message: 'Email already exists Please Login!'
        }
        response.status(401)
        //response as please login
    } 

    response.json(result)
})

app.post('/login', async (request, response)=>{
    const {body} = request
    const {email,password} = body
    const selectQuery = `SELECT *FROM USERS WHERE email='${email}'`
    const selectArr = await db.get(selectQuery)
    let result;

    if(selectArr === undefined){
        //response as Email doesn't exist
        result = {
            message: "Email Doesn't exist Please SignUp!"
        }
        response.status(401)
        
    }else{
        const comparePass = await bcrypt.compare(password,selectArr.password)
        if(comparePass){
            //success user is authenticated , navigate to home page
            
            //jsonwebtoken
            const payload = {
                email
            }
            const token = jsonwebtoken.sign(payload, "secret")
            result = {
                message: "Success",
                token
            }
            console.log(token)

            response.status(200)

        }
        else{
            //incorect password
            result = {
                message: "Incorrect Password"
            }
            response.status(401)
        } 
    }

    response.json(result)

})

const dataIn = async ()=>{
    // const Likequery = `INSERT INTO likes (post_id, user_id) VALUES (7, 13)`
    // const Commentquery = `INSERT INTO comments (post_id, comment, timestamp, user_id) VALUES (9, "Heloooo WOrld", "30 September 2023 22:00:00", 15)`
    // // // // const Postquery = `INSERT INTO post (user_id, caption, timestamp, image) VALUES (10, "Hello World", "2020", "hello.jpg")`
    // await db.run(Commentquery)
    // console.log("Hello")
}

const authenticateToken = (request, response, next)=>{
    let jwtToken;
    const authHeader = request.headers['authorization']
    if (authHeader !== undefined){
            jwtToken = authHeader.split(' ')[1]
    }
    if(jwtToken === undefined){
        response.status(401)
    }else{
        jsonwebtoken.verify(jwtToken, "secret", async(error, payload)=>{
            if(error){
                response.status(401)
            }else{
                request.email = payload.email;
                next();
            }
        })
    }
}

const getUserId = async(email)=>{
    const userId = `SELECT user_id FROM users WHERE email = '${email}'`
    const obj = await db.get(userId)
    return obj.user_id
}

app.post("/createPost", authenticateToken, async(request,repsonse)=>{
    const {body} = request;
    const {image,caption, timestamp} = body
    const userId = await getUserId(request.email)
  
    const query = `INSERT INTO post(user_id, caption, timestamp, image) VALUES(${userId}, '${caption}', '${timestamp}', '${image}')`;
    await db.run(query)
    console.log("Post Uploaded Successfully")
   
})

app.get("/getPosts", authenticateToken, async(request, response)=>{
    const query = `SELECT comments.comment_id AS comment_id, post.post_id AS post_id, commenters.user_id AS commented_user, post_users.user_id AS posted_user, post.caption AS caption, comments.comment AS comment, comments.timestamp AS comment_timestamp, post.timestamp AS posted_timestamp, post.image AS post_image, commenters.username AS comment_username, post_users.username AS post_username, commenters.profilePicture AS commented_profilePicture, post_users.profilePicture AS posted_profilePicture  FROM post LEFT JOIN comments ON post.post_id = comments.post_id LEFT JOIN users AS commenters ON comments.user_id = commenters.user_id LEFT JOIN users AS post_users ON post.user_id = post_users.user_id`
    const arr = await db.all(query)
    const userId = await getUserId(request.email)
      
    let currentPostId = 0
    let finalArray = []
    let postIdArray = []

    async function changeDataStructure(){
        for (const eachItem of arr){
            if(postIdArray.includes(eachItem.post_id)){
                //print comments
                    const commentsObj = {
                    user: {
                        profilePicture: eachItem.commented_profilePicture,
                        username: eachItem.comment_username
                    },comment: eachItem.comment,
                    timestamp: eachItem.comment_timestamp,
                    comment_id: eachItem.comment_id
                }
    
                const index = finalArray.length
                console.log(finalArray[index - 1].comments.push(commentsObj))
            }else{
                //print post details
                const user = {
                    profilePicture: eachItem.posted_profilePicture,
                    username: eachItem.post_username
                }
    
                const postContent = {
                    caption: eachItem.caption,
                    image: eachItem.post_image,
                    timestamp: eachItem.posted_timestamp,
                    post_id: eachItem.post_id
                }
    
                const commentsObj = {
                    user: {
                        profilePicture: eachItem.commented_profilePicture,
                        username: eachItem.comment_username
                    },comment: eachItem.comment,
                    timestamp: eachItem.comment_timestamp,
                    comment_id: eachItem.comment_id
                }
                const query = `SELECT * FROM likes WHERE user_id = ${userId} AND post_id = ${eachItem.post_id}`
               const likesArr = await db.all(query)

               const queryA = `SELECT COUNT(*) AS likesCount FROM likes WHERE post_id = ${eachItem.post_id}`
                const likesCount = await db.all(queryA)
                const numberOfLikes = likesCount[0].likesCount
               let liked 
               if(likesArr.length >= 1){
                    liked = true
               }else{
                liked = false
               }
               
                if(eachItem.comment_id !== null){
                    const contentsObj = {user: user, postContent: postContent, likes: numberOfLikes, sLiked: liked, comments: [commentsObj]}
                    finalArray.push(contentsObj)
                }else{
                    const contentsObj = {user: user, postContent: postContent, likes: numberOfLikes, isLiked: liked, comments: []}
                    finalArray.push(contentsObj)
                }
                
            }
            postIdArray.push(eachItem.post_id)
        }
        return finalArray
    }
    
    const details = await  changeDataStructure()
    const obj = {
        posts: finalArray
    }     

    console.log(obj.posts)
    response.json(obj)
})

app.post('/saveComment', authenticateToken, async(request, response)=>{
    const {body} = request
    const {post_id, comment, timestamp} = body
    const userId = await getUserId(request.email)
    const query = `INSERT INTO comments (post_id, user_id, comment, timestamp) VALUES(${post_id}, ${userId}, '${comment}', '${timestamp}')`;
    await db.run(query)
    const queryA = `SELECT * FROM comments INNER JOIN users ON comments.user_id = users.user_id`
    const arr = await db.get(queryA)
    const commentId = `SELECT * FROM comments order by comment_id DESC LIMIT 1`
    const id = await db.all(commentId)
    const objRes = {
        user: {
            profilePicture: arr.profilePicture,
            username: arr.username
        }, 
        comment: comment,
        timestamp: timestamp,
        comment_id: id[0].comment_id
    }
    response.json(objRes)
})

app.post('/addLike', authenticateToken, async(request, response)=>{
    const {body} = request
    const {post_id} = body
    const userId = await getUserId(request.email)
    const query = `INSERT INTO LIKES (post_id, user_id) VALUES(${post_id}, ${userId})`
    await db.run(query)
})

app.post('/deleteLike', authenticateToken, async(request, response)=>{
    const {body} = request
    const {post_id} = body
    const userId = await getUserId(request.email)
    const query = `DELETE FROM likes WHERE user_id = ${userId} AND post_id = ${post_id}`
    await db.run(query)
    console.log("successfully Deleted")
})