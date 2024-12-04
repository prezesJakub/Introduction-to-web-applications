const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./models/database');

const Book = require('./models/Book');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Witaj w naszej księgarni!');
});

sequelize.authenticate()
    .then(() => console.log('Połączono z SQLite (Książki)'))
    .catch((err) => console.error('Błąd połączenia z bazą danych (Książki)', err));

sequelize.sync({force: false})
    .then(() => console.log('Zsynchronizowano bazę danych (Książki)'))
    .catch((err) => console.error('Błąd synchronizacji (Książki)', err));

app.get('/api/books', async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
});

app.get('/api/books/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Nie znaleziono książki');
    }
});

app.post('/api/books', async (req, res) => {
    const { title, author, year } = req.body;
    const newBook = await Book.create({ title, author, year });
    res.json(`Dodano nową książkę o id: ${newBook.id }`);
});

app.delete('/api/books/:id', async (req, res) => {
    const result = await Book.destroy({ where: {id: req.params.id} });
    if (result) {
        res.send('Usunięto książkę');
    } else {
        res.status(404).send('Nie znaleziono książki');
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Serwer obsługi książek działa na http://localhost:${PORT}`);
});