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
    var arrayAnswersSuccess = [];
    
    for (var i in selectedAnswers){
        arrayAnswersTest.push(Number(selectedAnswers[i]));
    }

    console.log(arrayAnswersTest);
    const selectQueryQUIZ = "SELECT * FROM QUIZ";

    await db.query(selectQueryQUIZ, function (error, result) {
        if (error) {
            console.log(error.message);
            response.send(error.message);
        }

        var rows = result.rows;
        var countRows = result.rowCount;
        var countSuccess = 0;

        if (countRequestAnswers == countRows) {
            for (var i = 0; i < countRows; ++i) {
                var question = rows[i];
                var answers = question.answers;

                for (var j in answers) {                    
                    if (answers[j].correct) {
                        if (j == arrayAnswersTest[i]) ++countSuccess;
                        arrayAnswersSuccess.push(Number(j));
                    }
                }
            }

            console.log(countRows, countSuccess);
            console.log(arrayAnswersTest, arrayAnswersSuccess);

            const insertQueryLASTRESULT = "INSERT INTO LASTRESULT (userAns, successAns) VALUES ($1, $2)";

            db.query(insertQueryLASTRESULT, [arrayAnswersTest, arrayAnswersSuccess], function(err, res) {
                if (error) {
                    console.error(error.message);
                    response.send(error.message);
                }
            });

            response.render("result_test", {
                countQuestion: countRows,
                successQuestion: countSuccess,
                userAnswers: arrayAnswersTest,
                successAnswers: arrayAnswersSuccess
            });
        }
        else {
            response.render("error_count");
        }
    })
});

app.get('/test', async function(request, response) {

    const selectQueryQUIZ = "SELECT * FROM QUIZ";

    db.query(selectQueryQUIZ, function(error, result){
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

app.post('/last-result', async function(request, response) {

    const selectQueryLASTRESULT = "SELECT * FROM LASTRESULT";

    db.query(selectQueryLASTRESULT, function(error, result){
        if (error){
            console.log(error.message);
            response.send(error.message);
        }

       //console.log(result.rows);

       response.render("last_result", {
        tests: result.rows,
        countTests: result.rowCount
       })
    })
});



app.listen(port, function() {
    console.log("Сервер запущен по порту " + port);
});