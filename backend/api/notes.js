const express = require('express');
const db = require('../db/connection');
const router = express.Router();
const joi = require('joi');
const notes = db.get('Notes');

const schema = joi.object().keys({
    title:joi.string().min(2).max(30).required(),
    discription:joi.string().min(10).max(100).required()
})

router.get('/',(req,res,next)=>{

    notes.find({
        user_id:req.user._id
    }).then(allnotes =>{
        res.json(
            {allnotes})
        

    }).catch(error=>{
        next(error);
    })

})

router.post('/',(req,res,next)=>{

    const {error,result} = schema.validate(req.body);

    if(error===undefined){

        const newnote = {
            ...req.body,
            time:new Date().toLocaleTimeString(),
            user_id:req.user._id
        }

        notes.insert(newnote).then(insertedNote=>{
            res.json(insertedNote);
        }).catch(error=>{

            res.status(422);
            next(error);
        })

    }
    else{

        res.status(422);
        next(error);
    }

    

})

router.delete('/',(req,res,next)=>{

   
    
    notes.findOne({
        user_id:req.user._id,
        _id:req.query.id
    }).then(note =>{

        if(note){
            notes.remove({
                "_id":req.query.id
            })
    
            res.json({
                msg:`${req.query.id} note deleted`
            })
        }
        else{
            
            console.log("no posts");
            res.status(404);
            const err = new Error("There are no notes for that id");
            next(err);
        }

       
        

    }).catch(error=>{
        next(error);
    })

    // res.json({
    //     postid:req.params.id,
    //     user_id:req.user._id,
        
    // });
})

module.exports = router;