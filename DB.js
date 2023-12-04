const {Pool} = require('pg');
const {replicationStart} = require('pg-protocol/dist/messages');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '12345',
  port: 5432
});

pool.query('SELECT * FROM QUIZ', function(error, result) {
  if (error) {
    console.log(error.message);
  } else {
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
  }
  pool.end();
});