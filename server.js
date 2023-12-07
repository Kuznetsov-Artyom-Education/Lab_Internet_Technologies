const db = require("./DB");
const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.post('/submit-test', async function(request, response) {
    const selectedAnswers= request.body;

    var countRequestAnswers =  Object.keys(selectedAnswers).length;
    var arrayAnswersTest = [];
    
    for (var i in selectedAnswers){
        arrayAnswersTest.push(Number(selectedAnswers[i]));
    }

    console.log(arrayAnswersTest);

    await db.query("SELECT * FROM QUIZ", function (error, result) {
        if (error) {
            console.log(error.message);
            response.send(error.message);
        }

        var rows = result.rows;
        var countRows = result.rowCount;
        var countSuccess = 0;

        if (countRequestAnswers == countRows){

            for (var i = 0; i < countRows; ++i) {
                var question = rows[i];
                var answers = question.answers;
                var correct = answers[arrayAnswersTest[i]].correct;

                if (correct) ++countSuccess;
            }

            response.send(countSuccess + '/' + countRows);
        }
        else {
            response.render("error_count");
        }
    })
});

app.get('/test', async function(request, response) {

    db.query("SELECT * FROM QUIZ", function(error, result){
        if (error){
            console.log(error.message);
            response.send(error.message);
        }

        test = result;

       response.render("index", {
        rows: result.rows,
        countRows: result.rowCount
       })
    })
});

app.listen(port, function() {
    console.log("Сервер запущен по порту " + port);
});