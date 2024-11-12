const User = require('../../models/user')
const bcrypt = require("bcrypt")
const joi = require('joi')

const rigister = async(req,res,next)=>{
    const {error:validationError}= validateUser(req.body)
const {name,email,password} = req.body

try{

    if(validationError){
        const error = new error(validationError.details[0].message)
        error.statusCode = 400;
        throw error;
    }

const formatedName = name.toLowerCase()
const formatedEmail = email.toLowerCase()



const findedUser = await User.findOne({email:formatedEmail})
if(findedUser){
    const error = new Error ('This E-mail Already Exist');
    error.status = 400;
    throw error;
}

const hashedPassword = await bcrypt.hash(password,10)

const newUser= new User({
    name:formatedName,
    email:formatedEmail,
    password: hashedPassword
})

await newUser.save();
res.status(200).json({message:'User Rigistered Successfully',satus:true})



}catch(error){
    next(error)
}


};

module.exports = rigister;


function validateUser(data){
const userSchema = joi.object({
    name:joi.string().min(2).required(),
    email:joi.string().email().required(),
    password:joi.string().min(8).max(12).required(),
});


return userSchema.validate(data);
}