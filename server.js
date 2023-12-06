const db = require("./DB");
const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.post('/submit-test', function(request, response) {
    const selectedAnswers= request.body;
    console.log(selectedAnswers);

    response.send('Данные успешно получены');
});

app.get('/test', function(request, response) {

    db.query("SELECT * FROM QUIZ", function(error, result){
        if (error){
            console.log(error.message);
            response.send(error.message);
        }

       response.render("index", {
        rows: result.rows,
        countRows: result.rowCount
       })
    })
});

app.listen(port, function() {
    console.log("Server is running on port " + port);
});