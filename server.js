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

    var countRequestAnswers =  Object.keys(selectedAnswers).length;
    console.log(countRequestAnswers);

    db.query("SELECT * FROM QUIZ", function(error, result){
        if (error){
            console.log(error.message);
            response.send(error.message);
        }

        var rows = result.rows;
        var countRows = result.rowCount;

        for (var i = 0; i < countRows; ++i) {
            var question = rows[i];
            var descriptionQuestion = question.question;

            var answers = question.answers;
            var countAnswers = answers.length;

            console.log(descriptionQuestion, countAnswers);

            for (var j = 0; j < countAnswers; ++j) {
                var answer = answers[j];
                var descriptionAns = answer.answer;
                var correctAns = answer.correct;
                
                console.log(descriptionAns, correctAns);
            }
        }
        

        response.send('Данные успешно получены');
    })

    //response.send('Данные успешно получены');
});

app.get('/test', function(request, response) {

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

       db.end();
    })
});

app.listen(port, function() {
    console.log("Сервер запущен по порту " + port);
});