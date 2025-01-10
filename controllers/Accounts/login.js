const User = require('../../models/User');
const bcrypt = require('bcrypt')
const generateToken = require('../../utils/generateToken')

const login = async(req,res,next)=>{
    const {email,password}= req.body


    try{
        if(!email || !password){
            const error = new Error('all feilds are required')
            error.status = 400;
            throw error;
        }
        const formatedEmail = email.toLowerCase()
        const findedUser = await User.findOne({email:formatedEmail})
        if (!findedUser){
            const error = new Error('no user found')
            error.status = 404
            throw error;
        }

        const isPassMatch = await bcrypt.compare(password,findedUser.password)
        if(!isPassMatch){
            const error = new Error('password is incorrect')
            error.statusCode = 400;
            throw error;
        }


        const payload = {
            role:findedUser.role,
            id: findedUser._id,
            email:findedUser.email
        }


const {accessToken,refreshToken} = generateToken()

res.cookie("accessToken",accessToken)
res.cookie("refreshToken",refreshToken)
res.status(200).json({message:'login successfully',status:true,})
        





    } catch(error){
        next(error)
    }
}


module.exports = login;