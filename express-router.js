const express=require("express")
const posts=require("./data/db")


const router=express.Router()

//POST Tittle or content missing

router.post("/api/posts",(req,res)=>{
    if(!req.body.title||!req.body.contents){
        return res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }
    posts.add(req.body)
    .then((user)=>{
        res.status(201).json(user)
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).json({
            error: "There was an error while saving the post to the database"
        })
    })
})

//Post comments
router.post("/api/posts/:id/comments",(req,res)=>{
    if(!req.body.text){
        return res.status(400).json({
            message:"Need a text value",
        })
    }
  //  console.log("res",res.body.text)
    posts.insertComment(req.params.id,req.body)
    .then((post)=>{
        res.status(201).json(post)
    })
    .catch((error)=>{
        //log out the error so developer can know
        console.log(error)
        //Don't send it back to the client for security purpose
        res.status(500).json({
            message:"could not add user comment"
        })
    })
})

//GET API posts
router.get("/api/posts",(req,res)=>{
    posts.find(req.query)
    .then((users)=>{
        res.status(200).json(users)
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).json({
            message:"Error retreiving the posts"
        })
    })
})

//GET POST Id
router.get("/api/posts/:id",(req,res)=>{
    posts.findById(req.params.id)
    .then((user)=>{
        if(user){
            res.status(200).json(user)

        }
        else{
            res.status(404).json({
                message:"User Not found"
            })
        }
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).json({
            message:"error retreiving the post data"
        })
    })
})


//GET COMMENT with ID
router.get("/api/posts/:id/comments",(req,res)=>{
    posts.findPostComments(req.params.id)
        .then((posts)=>{
            if(posts){
                res.status(201).json(posts)
            }
        })
        .catch((error)=>{
            console.log(error)
            res.status(500).json({
                message:"error retreiving the post data with comments"
            })
        })
})


module.exports=router
