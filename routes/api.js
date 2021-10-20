import express from 'express'
import fs from 'fs/promises'

//router for /api requests, responses are typically restful
const router = express.Router()

router.get('/notes', async (req, res)=>{
    let json
    try {
        json = await fs.readFile('db/db.json',{ encoding: 'utf8'} , (err, data)=>{
            err? console.error(err) : null
            return data
        })
        json = JSON.parse(json)
    } catch (error) {
        console.error(error)
    }
    res.json(json)
})

router.post('/notes', (req, res)=>{
    //TODO: POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you)
    res.send('This is a POST request for notes')
})

router.delete('/notes', (req, res)=>{
    //DELETE /api/notes/:id should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
    res.send('This is a DELETE request for notes')
})

//endpoint for mistaken requests
router.all('/', (req,res)=>{
    res.status(400).send(`You need to add '/notes' to your request`)
})
export default router