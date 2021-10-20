import express from 'express';
import root from './routes/root.js'
import api from './routes/api.js'
import morgan from 'morgan';

const app = express()
//TODO: Deploy to Heroku
const port = process.env.PORT || 3001

morgan('tiny')
app.use(express.static('./public', {index: false}))
app.use('/', root)
app.use('/api', api)

app.listen(port, ()=>{
    console.log(`app listening at http://localhost:${port} 🥇`)
})