const serverPath = (req,res,next)=>{

const protocol = req.protocol
const hostName = req.get("host");

const domain = '${protocol}://${hostname}/';
req.domain = domain;

console.log(protocol);
next();
};

module.exports = serverPath