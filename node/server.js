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
app.post("/login", (req, res) => {
    let query = `SELECT first_name, last_name, address 
    FROM Users 
    WHERE user_id = '${req.body.username}' 
    AND password = '${req.body.password}'`
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
app.post("/register", (req, res) => {
    db.quest("INSERT INTO USERS")
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