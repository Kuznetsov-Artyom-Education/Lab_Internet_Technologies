const {Pool} = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '12345',
  port: 5432
});

const express = require('express');
const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine', 'ejs');

// Добавим парсер для обработки данных формы
app.use(express.urlencoded({ extended: true }));

// Изменим обработчик маршрута на POST
app.post('/submit-test', function(request, response) {
    const selectedAnswerQ1 = request.body;
    console.log(selectedAnswerQ1); // Для проверки

    // Отправим ответ об успешном получении данных
    response.send('Данные успешно получены');
});


app.get('/test', function(request, response) {

    pool.query("SELECT * FROM QUIZ", function(error, result){
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