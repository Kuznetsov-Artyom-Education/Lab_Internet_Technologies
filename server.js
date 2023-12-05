const db = require('./DB');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine', 'ejs');


app.use('/', function(request, response) {

    db.query("SELECT * FROM QUIZ", function(error, result){
        if (error){
            console.log(error.message);
        }

       response.render("index", {
        rows: result.rows,
        countRows: result.rowCount
       })
    })
});

app.listen(port, function() {
    console.log("'Server is running on port " + port);
});