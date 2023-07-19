import express from 'express'

import {getNotes , getNote , createNote , deleteNode} from './database.js'

const app = express()
app.set("view engine" , "ejs")
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.get('/' , async (req , res) => {
    const notes = await getNotes()
    res.render("toDoList.ejs" , {notes})
})

app.get("/createNew" , async (req , res) => {
    res.render("createNew.ejs")
})  
app.post("/createNew", (req , res) => {
    const title = req.body.title
    const contents = req.body.contents
    createNote(title , contents)

    res.redirect("/")
})


app.post("/delete/:id" , (req , res) => {
    const id = +req.params.id
    deleteNode(id)
    res.redirect("/")
})

app.listen(8080 , () => {
    console.log("Server is running on port 8080")
})