const passwordValidator = require('password-validator');

const schema = new passwordValidator();

schema
.is().min(6)                                    
.is().max(100)                                  
.has().uppercase()                              
.has().lowercase()                              
.has().digits(1)                                
.has().not().spaces()
.has().symbols()                           
.is().not().oneOf(['Passw0rd', 'Password123']); 

const validatePassword = (password) => {
    const isValid = schema.validate(password)
    return isValid
}

module.exports = validatePassword