const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

// Bodyparser Middleware

app.use(bodyParser.urlencoded({extended: true}));

// Static folder
app.use(express.static(path.join(__dirname,'public')));

//signup Route cause it is a post that i am handling

app.post('/signup',(req,res)=>{
  
    // our objects into its own variable
    const { firstName, lastName, email} = req.body;

    //  valiadation to make sure field is not empty
    if(!firstName || !lastName || !email){
         res.redirect('/fail.html');
         return;
    }

// Construct req Data
    const data = {
           members:[
               {
                 email_address: email,
                 status:'subscribed',
                 merge_fields: {
                     FNAME: firstName,
                     LNAME: lastName
                 }
               }
           ]

    }

    // request to mail chimp api

    const options = {
        url:'https://<dc>.api.mailchimp.com/3.0/lists/ab534d32e5',
        method:'POST',
        headers:{
            Authorization:'auth 482a20f03b2c0c7a783d5fcfc3f842fc-us19'
        },
         body: postData

    }
    
    request(options, (err,response,body ) =>{

    });

});


const PORT= process.env.PORT || 5002;

app.listen(PORT, console.log(`Server started on ${PORT}`));