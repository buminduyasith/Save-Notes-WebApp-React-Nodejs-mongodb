
 var jwt = require('jsonwebtoken');

function checkTokenSetUser(req,res,next){
   
    const authheader  = req.get('authorization');
    
    if(authheader){

        
        const token = authheader.split(' ')[1];
      

        if(token){

          
            jwt.verify(token, process.env.API_SECRET, function(err, user) {
                if(err ==null){
                   
                    req.user=user;
                    next();

                }
                else{
                   
                    res.status(403);
                    next(err);
                }
            });

        }
        else{
            next();
        }

    }
    else{
        next();
    }

}


function isLogin(req,res,next){
   
    if(req.user){
        
        console.log("ww");
        next();
    }

    else{

        console.log("wwaaa");
        const error = new Error("unauthorized");
        res.status(401);
        next(error);
    }


}

module.exports = {
    checkTokenSetUser,
    isLogin
}