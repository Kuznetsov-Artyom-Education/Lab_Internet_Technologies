const {Client} = require('pg');
const {replicationStart} = require('pg-protocol/dist/messages');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '12345',
  port: 5432
});

client.connect();

client.query('SELECT * FROM QUIZ', function(error, response) {
  if (error) {
    console.log(error.message);
  } else {
    var rows = response.rows;
    var countRows = response.rowCount;

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
  client.end();
});