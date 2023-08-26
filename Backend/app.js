const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require('cors'); 
app.use(cors());


const loginandsignup = require('./User Module/loginandsignup');


// api to signup into the platform
app.post('/signup',function(req,res){
console.log(`Inside User Signup ${JSON.stringify(req.body)}`);
loginandsignup.signup(req,res)
})

// api to login into the platform
app.post('/login',function(req,res){
    console.log(`Inside User login ${JSON.stringify(req.body)}`);
    loginandsignup.login(req,res)
    })
app.listen(3005, () => {
    console.log('Server is running on port 3005');
});


