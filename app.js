const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");



const app = express();

var items = ["Sleep", "Coding","Playing"];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {

    var day = date.getDate();

    res.render("list", {
        listTitle: day,
        newListItems: items,
        showNextButton: true


    });

});

app.post("/", function(req, res ){

    var item =  req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
    
    res.redirect("/");

});


app.get("/work", function(req, res){
    res.render("list", {
      listTitle: "Work list",
      newListItems: workItems,
      showNextButton: true // Add this line to pass a variable to the template
    });
  });
  

app.post("/work", function(req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
