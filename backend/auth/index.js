 const express = require('express');
 const joi = require('joi');
 const bcrypt = require('bcrypt');
 const db = require('../db/connection');
 var jwt = require('jsonwebtoken');


 const users = db.get('users');
 users.createIndex('username',{unique:true});

 const router = express.Router();

 const schema_signup = joi.object().keys({
     username:joi.string().alphanum().min(2).max(10).required(),
     password:joi.string().trim().min(5).max(10).required(),
     fullname:joi.string().min(3).max(20).required()
 })

 const schema_log = joi.object().keys({
    username:joi.string().alphanum().min(2).max(10).required(),
    password:joi.string().trim().min(5).max(10).required(),
    
})


 router.get('/',(req,res)=>{
    res.json({
        msg:"auth is workd 😍⭐"
    })
 });

 router.post('/signup',async (req,res,next)=>{

    //const result =  joi.validate(req.body,schema);
    const { error, result } = schema_signup.validate(req.body);
    
    if(error === undefined ){

        users.findOne({
            username:req.body.username
        }).then(user =>{

            
            if(user!==null){

                const err = new Error("user name is already taken please try diff one...");
                console.log("username is same");
                res.status(409);
                next(err);

            }else{

                bcrypt.hash(req.body.password,12).then(hashpwd=>{

                    const newuser = {
                        username:req.body.username,
                        password:hashpwd,
                        fullname:req.body.fullname
                    }

                    users.insert(newuser).then(insertedUser=>{


                        delete insertedUser.password;
                        res.status(201).json({
                            insertedUser,
                           
                           
                        })
                    }).catch(error=>{
                        
                        console.log("signup error");
                        next(error);
                    })

                    

                })
                
               

            }
           
           
        })

    }
    else{
       
        console.log("signup body error")
        console.log(error);
        res.status(422);
        next(error)
    }

  

  

 });

    router.post('/log',(req,res,next)=>{

        console.log("HIT");
        const {error,result} = schema_log.validate(req.body);

        if(error===undefined){

            users.findOne({
                username:req.body.username
            }).then(user=>{

                if(user){

                    bcrypt.compare(req.body.password,user.password)
                        .then(result=>{

                            if(result){

                                const payload = {
                                    _id:user._id,
                                    username:user.username,
                                    fullname:user.fullname
                                }

                                jwt.sign(payload,process.env.API_SECRET,{
                                      expiresIn:'1d'
                                },(err,token)=>{
                                    if(err == undefined){
                                        res.json({token});
                                    }
                                    else{

                                        resError_422(res,next);
                                    }
                                   
                                })

                                //delete user.password;
                                //res.json(user);
                            }
                            else{
                                res.status(403);
                                console.log("username or password incorrect");
                                const err = new Error("username or password incorrect");
                                next(err);

                            }

                           

                        }).catch(err=>{
                            console.log("catch");
                          
                            res.status(422);
                            next(err);
                        })
                    
                   
                    
                }

                //user not found
                else{

                    console.log("user not found");
                    resError_422(res,next);

                }
                
            }).catch(err=>{
                console.log("catch");
                res.status(500);
                next(err);
            })
            

        }
        
        //joi doesn't validate the given req.body

        else{

            console.log("catchz");
            resError_422(res,next);

        }

    })

    function resError_422(res,next) {

        res.status(422);
        const err = new Error("unable to login please try again");
        next(err);
        
    }



 module.exports = router;