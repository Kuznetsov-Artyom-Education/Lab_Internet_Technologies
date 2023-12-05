const db = require('./DB');
const express = require('express');
const app = express();

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

app.listen(3000);

// db.query('SELECT * FROM QUIZ', function(error, result) {
//     if (error) {
//       console.log(error.message);
//       db.end();
//     } else {
//       var rows = result.rows;
//       var countRows = result.rowCount;

//       for (var i = 0; i < countRows; ++i) {
//         var question = rows[i];

//         var descriptionQuestion = question.question;

//         var answers = question.answers;
//         var countAnswers = answers.length;

//         console.log(descriptionQuestion, countAnswers);

//         for (var j = 0; j < countAnswers; ++j) {
//           var answer = answers[j];
//           var descriptionAns = answer.answer;
//           var correctAns = answer.correct;

//           console.log(descriptionAns, correctAns);
//         }
//       }
//     }
//   });