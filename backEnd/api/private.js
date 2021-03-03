'use strict'

const User = require('../db');

let controller = {
    protected: (req,res)=>{
        console.log("caso protected");
        res.send({result: true});
    },
    userData: (req,res)=>{
        res.send({id:req.user.id, name:req.user.name});
    },
    clinicData: (req,res)=>{
        User.consult_record.findMany().then(data => {
            res.send(
                {data:data}
            );
        })
        
    },
}

module.exports = controller;