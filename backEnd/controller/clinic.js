'use strict'

const User = require('../model');

let controller = {
    clinicData: (req,res)=>{
        User.consult_record.findMany().then(data => {
            res.send(
                {data:data}
            );
        })
        
    },
}

module.exports = controller;