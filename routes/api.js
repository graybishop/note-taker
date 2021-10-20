import express from 'express'

const router = express.Router()

router.get('/notes', (req, res)=>{
    res.send('This is a GET request for notes')
})

router.post('/notes', (req, res)=>{
    res.send('This is a POST request for notes')
})

router.delete('/notes', (req, res)=>{
    res.send('This is a DELETE request for notes')
})

//endpoint for mistaken requests
router.all('/', (req,res)=>{
    res.status(400).send(`You need to add '/notes' to your request`)
})
export default router