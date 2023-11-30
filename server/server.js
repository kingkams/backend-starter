import config from "../config/config.js";
import app from './express.js'
import mongoose from 'mongoose'



app.use((err, req, res, next) => {
    if ( err.name==='UnauthorizedError'){
    res.status(401).send({error: 'Unauthorized'})
    }else{
        res.status(400).json({error: err.name+': '+err.message})
        console.log(err)
    }
}
)

mongoose.connect(config.mongoUri,{ useNewUrlParser: true,
    useUnifiedTopology: true });

app.listen(config.port,
    (error) => {
        console.log(`console started on ${config.port}`)})