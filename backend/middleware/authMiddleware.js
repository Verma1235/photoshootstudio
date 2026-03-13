
const authMiddleware=(req,res,next)=>{
    console.log(`auth middleware executed!!`);
    next();
}


export {authMiddleware};