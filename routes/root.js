import express from 'express'

let router = express.Router()

router.get('/', (req, res)=>{
    res.send('Home Page HTML Goes Here')
})
router.get('/notes', (req, res)=>{
    res.send('Notes HTML Goes Here')
})

export default router