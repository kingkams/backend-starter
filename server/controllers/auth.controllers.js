import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import config from '../../config/config.js'
import { expressjwt } from "express-jwt"
const signIn = async (req, res) => {
    try {
        let user = await User.findOne({"email": req.body.email})
        if (!user) {
            return res.status(401).send({message: "Invalid Credentials"})
        }
        if (!user.authenticate) {
            return res.status(401).send({message: "Wrong Email or password"})
        }
        const token = jwt.sign({_id: user._id}, config.jwtSecret,)
        res.cookie('t', token, {expire: new Date() + 999})
        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (e) {
        return res.status('401').json({e: 'Could not sign in'})
    }
}
const signOut = async (req, res) => {
    res.clearCookie('t')
    return res.status(200).send({message: "Signed out"})
}

const requireSignIn = expressjwt ({
    secret: config.jwtSecret,
    userProperty: 'auth',
    algorithms: ['RS256']
})

const hasAuth = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!authorized) {
        return res.status(401).send({message: "Unauthorized"})
    }
    next()
}


export default {signIn, signOut, requireSignIn,hasAuth}