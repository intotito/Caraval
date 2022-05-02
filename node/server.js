const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded());


var corsOptions = {
    
    origin: "*"
};

app.use(cors({
    origin: true, // "true" will copy the domain of the request back
                  // to the reply. If you need more control than this
                  // use a function.

    credentials: false, // This MUST be "true" if your endpoint is
                       // authenticated via either a session cookie
                       // or Authorization header. Otherwise the
                       // browser will block the response.

    methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
                                           // pre-flight OPTIONS requests
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = require("./models");

app.get("/home", (req, res) => {
//    res.json({message: "Welcome to Caraval application."});
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.send("<h2>Nawa for WAEC</h2>");
});
app.post("/register", (req, res) => {
    query = `SELECT user_id FROM USERS WHERE user_id = '${req.body.userid}'`;
    query1 = `INSERT INTO USERS VALUES ('${req.body.userid}' , '${req.body.password}', 
                '${req.body.fName}', '${req.body.lName}', '${req.body.address}')`;
    console.log("Register called\n" + query);
    db.query(query, (err, data)=>{
        console.log(data);
        if(data?.length > 0){
            console.log("Duplicate looming");
            res.json({
                status: 0,
                length: 0,
                data:[{message: "User Already Exist"}]
            });
        } else{
            console.log(query1);
            db.query(query1, (err, data)=>{
                console.log(data);
                console.log(err);
                res.json({
                    status: 1,
                    length: 0,
                    data:[{message: "User Registered"}]
                })
            });
        } 
    });
    
        
    
});

app.post("/login", (req, res) => {
    let query = `SELECT first_name, last_name, address 
    FROM Users 
    WHERE user_id = '${req.body.username}' 
    AND password = '${req.body.password}'`;
    db.query(query,
    (err, data, fields) => {
        if(err){
            res.json({
                status: -1,
                length: 0,
                data:[{message: "Erro encountered: " + err.message}],
            }); 
            return console.log(err.message);
        }
        console.log(data[0]);
        if(data?.length > 0){
            res.json({  
                status: 1, 
                length: data?.length,
                data: data,
                
            });
        } else {
            res.json({
                status: 0,
                length: 0,
                data: [{message: "Invalid username or password"}]
            });
        }
    });
    console.log("Request body : " + req.body.password + "\n" + query);
   //res.send("<h2>" + req.body + "godigod</h2>");
}); 
app.get("/search:uid/:cat", (req, res)=>{
    console.log("Just checking");
    console.log(req.params);
    console.log(req.params.uid);
    let query = "";
    if(req.params.cat.substring(1,) == 0){
        query = `SELECT CONCAT(first_name, " ", last_name) AS Name, address, skill,
        status FROM Handyman WHERE (last_name LIKE '%${req.params.uid.substring(1,)}%' || first_name LIKE '%${req.params.uid.substring(1,)}%')`;
    } else if(req.params.cat.substring(1,) == 1){
        query = `SELECT CONCAT(first_name, " ", last_name) AS Name, address, skill,
        status FROM Handyman WHERE skill LIKE '%${req.params.uid.substring(1,)}%'`;
    }else if(req.params.cat.substring(1,) == 2){
        query = `SELECT CONCAT(first_name, " ", last_name) AS Name, address, skill,
        status FROM Handyman WHERE address LIKE '%${req.params.uid.substring(1,)}%'`;
    }
    console.log(query);
    db.query(query, 
             (err, data)=>{
                 if(err){
                     console.log("SQL error: " + err.message);
                     res.json({
                         status: 0,
                         length: 0,
                         data: [{message: "Error occured Sorry!!"}]
                     });
                 } else{
                     console.log(data);
                     res.json({
                        status: 1,
                        length: data?.length,
                        data: data
                    });
                 }
             });
    
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> console.log(`server running on port ${PORT}`));

//app.use(express.static('public'));

//db.sequelize.sync();
/*
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });
  */