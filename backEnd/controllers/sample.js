'use strict'

const User = require('./../models/user');

let controller = {
    unprotected: (req,res)=>{
        res.send("Ok. ruta sin proteger");
    },
    protected: (req,res)=>{
        console.log("caso protected");
        res.send({result: true});
    },
    userData: (req,res)=>{
        res.send({id:req.user.id, name:req.user.name});
    },
    clinicData: (req,res)=>{
        // res.send({data:[{id:1, name:"chan tai man"}]});
        User.consult_record.findMany().then(data => {
            res.send(
                {data:data}
            );
        })
        
    },
}

module.exports = controller;