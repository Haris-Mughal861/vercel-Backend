const path = require ('path');
const fs = require('fs');

const checkImgSize = (req,res,next)=>{


    try{
        if(req,file,size> 1024*1024*3){
            const error = new Error('file size must be 3mb')
            error.statusCode = 400
            throw error

        }



     next();   
    }catch(error){
fs.unlink(req.file.path,(error)=>{
    if(error) console.error(error);

});
        next(error)
}
};

module.exports = checkImgSize