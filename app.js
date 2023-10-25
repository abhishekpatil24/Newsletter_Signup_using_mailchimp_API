const express = require("express");
const req = require("express/lib/request");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { post } = require("request");
const { response } = require("express");



const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))


app.get("/", function(req, res){
    
    res.sendFile(__dirname+"/signup.html")
    

})

app.post("/", function(req, res){
    const firstName = (req.body.fname)
    const lastName = (req.body.lname)
    const email = (req.body.mail)

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_feilds: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const JSONdata = JSON.stringify(data);

    // ID is what you get after registering to mailchimp service
    // API KEY will also be provided from mailchimp
    // replace both with the same below

    const url = "https://us20.api.mailchimp.com/3.0/lists/ID"

    const options = {
        method: "POST",
        auth: "API KEY"
    }



    const request = https.request(url, options, function(response){

        if (response.statusCode === 200) {
            res.sendFile(__dirname+ "/success.html")
        }
        else {
            res.sendFile(__dirname+ "/failure.html")
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    }) 
    
    request.write(JSONdata);
    request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/")
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Running on Port 3000");
})


// api key : 
// id : 