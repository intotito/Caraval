const express = require('express');
const cors = require('cors');
const app = express();
var corsOptions = {
    
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = require("./models");

app.get("/", (req, res) => {
//    res.json({message: "Welcome to Caraval application."});
    res.send("<h2>Nawa for WAEC</h2>");
});
app.get("/aba", (req, res) => {
    db.query("Select CONCAT(last_name, ' earns ', salary, ' monthly but wants ', 3 * salary) as 'Report' from employees",
    (err, data, fields) => {
        if(err) return "Nawa for WAEC";
        res.json({
            status: "success", 
            length: data?.length,
            data: data,
        })
    });
 //   res.send("<h2>Nwa ABA godigod</h2>");
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