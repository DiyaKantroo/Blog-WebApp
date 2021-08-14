//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Hi!!Welcome to our Daily Journal Web App! Here you can Write about your day, your goals, what u accomplished today and also rant about whatever doesn't feel right to you!! This service is Absolutely free and is extremely user friendly!! The blogs can be composed under the compose page  and will be displayed here under the home page itself.The content here will be truncated and can be accessed by entering the name of the title in the Url. I hope you have fun here!! Happy writting!";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

var objects= [] ;                        // global scope array


const app = express(); 
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}));              
app.use(express.json());


app.get("/" , function(req , res){
  res.render("home",{ para1:homeStartingContent , array: objects});                           // sends ejs file over to home route
  
})

app.get("/about" , function(req,res){
  res.render("about" , {para2 :aboutContent })              //sending array to ejs 
})

app.get("/contact" , function(req , res){
  res.render ("contact", {para3:contactContent})
})
app.get("/compose" , function(req,res){
res.render("compose" )
})

app.post("/compose" , function(req , res){

const obj ={                                      // try and keep this constant
  title : req.body.textbox ,                      // Here textbox and post are names of input in ejs file!
  content : req.body.post                         // single blog entry obj created!
};

//console.log(obj);
objects.push(obj);
//res.send("posted");
//console.log(objects);
res.redirect("/") ;
})


app.get("/posts/:postname", function(req,res){
  console.log(req.params.postname);                      // returns url 
   var para = _.lowerCase(req.params.postname) ;        // changed rn to lower case 
   for(var i= 0 ; i<objects.length ; i++){
    if(para == _.lowerCase(objects[i].title))
      { console.log("match found");
         res.render("post" , {
           para1: objects[i].content , heading: objects[i].title 
         })
      }
    }
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
