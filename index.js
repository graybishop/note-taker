import express from 'express';
import root from './routes/root.js'
import api from './routes/api.js'

const app = express()
const port = 3001

app.use(express.static('./public', {index: false}))
app.use('/', root)
app.use('/api', api)

app.listen(port, ()=>{
    console.log(`app listening at http://localhost:${port} 🥇`)
})