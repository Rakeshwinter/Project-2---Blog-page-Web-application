import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


let data = [];

app.get("/",(req, res) => {
    res.render("index.ejs",{
        data: data
    });
});

app.get("/delete",(req, res) => {
    data = data.filter(function(subArrays){
        return !subArrays.includes(req.query.position);
    });
    res.render("index.ejs", { data: data });
});

app.get("/edit",(req, res) => {
    let editList = data.filter(function(subArrays){
        return subArrays.includes(req.query.position);
    });
    editList = editList.flat();
    res.render("create.ejs", { list: editList});
});



app.get("/create",(req, res) => {  
    res.render("create.ejs");
});


let num = 0;
app.post("/submit", (req, res)=>{
    let topic = req.body['topic'];
    let description = req.body['message'];
    data.push([topic, description,`${num}`]);
    res.render("create.ejs");
    num++;
});

app.post("/recreate", (req, res)=>{
    let editList = data.filter(function(subArrays){
        return subArrays.includes(req.body["value"]);
    });
    editList = editList.flat();

    let topic = req.body['topic'];
    let description = req.body['message'];
    let value = req.body["value"];
    
    data[value] = [topic, description, value];

    res.render("index.ejs",{ data:data });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

