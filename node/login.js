const bodyParser = require('body-parser');
const express=require('express');
var mysql = require('mysql');
var wrongpassword=0



const app=express();
app.set('view engine', 'ejs');
const port=8000;
app.get('/',(req,res)=>{
  // res.render('login',{flag});

 
     res.sendFile('login.html',{root:__dirname});  
    //  try removing login.html

});

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mydb"
  });
  
  con.connect(function(err) {
    console.log(`if`)
    if (err) throw err;
    console.log("Connected!");
    
    });
  
  app.post('/checkUser',(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    var sql="SELECT username,password FROM user_info WHERE username=? "
    con.query(sql,[username,password],function(err,result){

      console.log(result);
      if(result.length!=0){
        if(result[0].password==password){
          res.send(`WELCOME ${username}`);
        }
        else{
        // res.send(`${username} you have typed wrong password`)
        wrongpassword=1
        res.render('login',{username:username,password:password,wrongpassword:1});
        }
}
      else{
          // return res.sendFile('D:/projects/loginpage/node/regi.html')}
          
          res.render('login',{username:username,password:password});
        }
    });
  });
  app.post('/createUser',(req,res)=>{
    const new_username=req.body.new_username
    const password1=req.body.password1
    const password2=req.body.password2
    console.log(`${new_username}`)
    if(password1!=password2){
      res.render('regi',{new_username:new_username,password1:password1,password2:password2});
      
    }
    else{
      var sql="INSERT INTO user_info (username, password) VALUES (?,?)"
      con.query(sql,[new_username,password1],function(err,result){
        if(err){ throw(err)}
        // res.sendFile('login.html',{root:__dirname});
        res.render('welcome newuser',{new_username:new_username});

        
        
      })

    }

  })

app.get('/regi',(req,res)=>{
   res.sendFile('regi.html',{root:__dirname})
})

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});

