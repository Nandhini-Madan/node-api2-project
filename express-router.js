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

module.exports=router
