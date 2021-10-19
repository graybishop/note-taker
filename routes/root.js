import express from 'express'

let router = express.Router()

router.use(express.static('../public'))

router.get('/', (req, res)=>{
    res.sendFile('../public/index.html')
})
router.get('/notes', (req, res)=>{
    res.send('Notes HTML Goes Here')
})

export default router