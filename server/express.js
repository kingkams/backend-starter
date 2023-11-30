import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compress from 'compression';
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(cors())

app.use(helmet())
app.use('/',userRoutes)
app.use('/',authRoutes)
app.get('/',(req,res)=>{
    res.status(200).send("hiii")
})
export default app;