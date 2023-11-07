const User = require('../models/User')
const {BadRequest, NotFound, Unauthenticated} = require('../errors')
const { StatusCodes } = require('http-status-codes')
const validatePassword = require('../utils/validation')

const register = async (req, res) => {
    const {firstName, lastName, email, password, confirmPassword} = req.body
    if(password != confirmPassword){
        throw new BadRequest('password must be same as confirmPassword!!')
    }
    if(!validatePassword(password)){
        throw new BadRequest('password validation error!!')
    }
    let user = await User.findOne({email})
    if(user){
        return res.status(StatusCodes.CONFLICT).json({error: true, message: "user already exists!!"})
    }
    user = await User.create({firstName, lastName, email, password})
    res.status(StatusCodes.CREATED).json({error: false, data:{userRegistered: true}})
}
const login = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        throw new BadRequest('Please Provide email & password!!')
    }
    const user = await User.findOne({email})
    if(!user){
        throw new NotFound('User not found!!')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new Unauthenticated('Password incorrect!!')
    }
    const token = await user.generateJWT()
    res.cookie('jwt', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 25892000000)
    })
    return res.status(StatusCodes.OK).json({error: false, data: {userLoggedIn: true}})
}
const loginWithGoogle = async (req, res) => {
    const {email, given_name, family_name} = req.body.credentials
    const user = User.create({firsName: given_name, lastName: family_name, email})
    const token = await user.generateJWT()
    res.cookie('jwt', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 25892000000)
    })
    return res.status(StatusCodes.CREATED).json({error: false, data: {userLoggedIn: true}})
}

const logout = async (req, res) => {
    res.clearCookie('jwt')
    res.status(StatusCodes.OK).json({error: false, data: {userLoggedOut: true}})
}

module.exports = {
    register,
    login,
    loginWithGoogle,
    logout
}