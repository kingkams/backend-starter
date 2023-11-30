import  User from '../models/user.model.js';
import extend from 'lodash/extend.js'
const create= async (req, res) =>{
    try{
        const user= await User.create(req.body)
        res.status(201).send("successfully sign up")
    }catch(err){
        res.status(400).json({message:err})
    }
}
const list= async (req, res) =>{
    try{
        const users= await User.find().select('name email updated created')
        res.status(200).json(users)
    }catch(err){
        res.status(400).json({message:err})
    }

}
const userByID = async (req, res, next,id) =>{
    try{
    let user = await User.findById(id)
    if(!user){
        return res.status(404).json({message:'user not found'})
    }
    req.profile = user
    next()
} catch (err){
        res.status(400).json({message:err})
}}
const read = (req, res) =>{
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    res.status(200).json(req.profile)
    return res.json(req.profile)
}
const update = (req, res) =>{
    try{
        let user = req.profile
        user = extend(user , req.body)
        user.updated=Date.now()
        req.profile.hashed_password = undefined
        req.profile.salt = undefined
        res.status(200).json(req.profile)
    } catch (err){
        res.status(400).json({message:err})
    }

}


const deleteUser = async (req, res) =>{
    try{
        let user = req.profile
        let deletedUser =await user.remove()
        deletedUser.hashed_password=undefined
        deleteUser.salt=undefined
        res.status(200).json({message:'user deleted'})
    } catch (err){
        res.status(400).json({message:err})
    }
}
export default {create,  list, userByID, read, update, deleteUser}