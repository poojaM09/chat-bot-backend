const express = require("express");
const cors = require('cors')
const app = express();


let Router = require("./router/Router");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.use("/", Router);

app.all("*", function (req, res) {
    return res.send({MSG:"Page not found"});
});


const port = process.env.PORT || '9090';
app.listen(port, (err) => { 
    if (err)
        throw err   
    else
        console.log("Server is running at port %d:", port);
});


