const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please Provide FirstName!!'],
        maxLength: 30
    },
    lastName: {
        type: String,
        required: [true, 'Please Provide LastName!!'],
        maxLength: 30
    },
    email: {
        type: String,
        required: [true, 'Please Provide Email!!'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true
    },
    password: {
        type: String,
        minLength: 6
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
}, { collection: "users" })

UserSchema.pre('save', async function(){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
})

UserSchema.methods.generateJWT = async function(){
    let token = jwt.sign({id: this._id}, process.env.JWT_SECRET)
    this.tokens = this.tokens.concat({token})
    await this.save()
    return token
}

UserSchema.methods.comparePassword = async function(password){
    const isMatched = await bcrypt.compare(password, this.password)
    return isMatched
}

module.exports = new mongoose.model('User', UserSchema)

