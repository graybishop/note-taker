import express from 'express'

let router = express.Router()

router.get('/', (req,res)=>{
    res.status(400).send(`You need to add '/notes' to your request`)
})
router.post('/', (req,res)=>{
    res.status(400).send(`You need to add '/notes' to your request`)
})
router.delete('/', (req,res)=>{
    res.status(400).send(`You need to add '/notes' to your request`)
})

router.get('/notes', (req, res)=>{
    res.send('This is a GET request for notes')
})

router.post('/notes', (req, res)=>{
    res.send('This is a POST request for notes')
})

router.delete('/notes', (req, res)=>{
    res.send('This is a DELETE request for notes')
})

export default router