const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


router.get('/test', (req, res) => res.send('user route testing!'));

router.get('/details/:id', (req, res) =>{
    const id = req.body.userId;
    console.log(id); 
    User.findById(req.params.id).select("-password")
    .then((resp) =>{
        res.status(200).json(resp); 
    }) 
    .catch((err) =>{
        res.status(500).send(err); 
    })
})

router.post('/register-new-user', async (req, res) => {
    const p1 = req.body.password; 
    const p2 = req.body.confirmPassword;
    // console.log(req.body);
    const { confirmPassword, ...userData } = req.body;
    const newUser = new User(userData);
    // console.log(newUser); 
    // console.log(p1); 
    // console.log(p2); 

    if (p1 != p2) {
        console.log("passowlskf sfdja"); 
        res.status(400).json({error: "Password do not match"});
    }
    else {

        try {
            const savedUser = await newUser.save();
            res.status(200).json(savedUser);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
});


router.post('/login', (req, res) =>{
    console.log(req.body);
    User.findOne({email: req.body.email})
    .then((result) =>{
        const p2 = result.password; 
        if(p2 != req.body.password){
            res.status(500).send('incorrect password');
        }
        else{
            res.status(200).json(result); 
        }
    })
    .catch((err) =>{
        res.status(500).send(err);
    })
    
})

module.exports = router;