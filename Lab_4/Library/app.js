const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Witaj w naszej księgarni!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});

const sequelize = require('./models/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authenticateJWT = require('./middlewares/auth');
const validator = require('validator');

sequelize.authenticate()
    .then(() => console.log('Połączono z SQLite'))
    .catch((err) => console.error('Błąd połączenia z bazą danych ', err));

const Book = require('./models/Book');
const Order = require('./models/Order');
const User = require('./models/User');

sequelize.sync({force: false})
    .then(() => console.log('Zsynchronizowano bazę danych'))
    .catch((err) => console.error('Błąd synchronizacji ', err));

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

app.get('/api/orders/:userId', async (req, res) => {
    const { userId } = req.params;
    const orders = await Order.findAll({
        where: { userId },
        include: Book,
    });
    res.json(orders);
});

app.post('/api/orders', async (req, res) => {
    const {userId, bookId, quantity} = req.body;

    const book = await Book.findByPk(bookId);
    if (!book) {
        return res.status(404).json({ error: 'Książka o podanym ID nie istnieje' });
    }

    const newOrder = await Order.create({userId, bookId, quantity});
    res.json(`Dodano nowe zamówienie o id: ${newOrder.id}`);
});

app.delete('/api/orders/:orderId', async (req, res) => {
    const { orderId } = req.params;

    const result = await Order.destroy({where: {id: orderId} });
    if (result) {
        res.json('Usunięto zamówienie');
    } else {
        res.status(404).send('Nie znaleziono zamówienia');
    }
});

app.patch('/api/orders/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { userId, bookId, quantity } = req.body;

    const order = await Order.findByPk(orderId);
    if (!order) {
        return res.status(404).json({ error: 'Zamówienie o podanym ID nie istnieje' });
    }

    if(userId !== undefined) order.userId = userId;
    if(bookId !== undefined) {
        const bookExists = await Book.findByPk(bookId);
        if(!bookExists) {
            return res.status(404).json({ error: 'Książka o podanym ID nie istnieje' });
        }
        order.bookId = bookId;
    }
    if(quantity !== undefined) order.quantity = quantity;

    await order.save();
    res.json({ message: 'Zamówienie zaktualizowane', order });
});

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Podany e-mail jest nieprawidłowy' });
    }

    try {
        const newUser = await User.create({ email, password });
        res.json({ id: newUser.id, message: 'Zarejestrowano pomyślnie'});
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'Podany e-mail jest już zarejestrowany' });
        }
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: {email} });
    if (!user) {
        return res.status(401).json({ error: 'Nieprawidłowy e-mail lub hasło' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Nieprawidłowy e-mail lub hasło' });
    }

    const token = jwt.sign({ userId: user.id }, 'sekretnyklucz', { expiresIn: '1h' });
    res.json({ token });
});

app.delete('/api/users/:userId', authenticateJWT, async (req, res) => {
    const { userId } = req.params;

    if(parseInt(userId, 10) !== req.userId) {
        return res.status(403).json({ error: 'Brak dostępu do tego zasobu' });
    }

    const result = await User.destroy({ where: { id: userId } });
    if (result) {
        res.json({ message: 'Usunięto użytkownika' });
    } else {
        res.status(404).json({ error: 'Użytkownik o podanym ID nie istnieje' });
    }
});

app.patch('/api/users/:userId', authenticateJWT, async (req, res) => {
    const { userId } = req.params;
    const { email, password } = req.body;

    try { 
        if (req.userId !== parseInt(userId)) {
            return res.status(403).json({ error: 'Nie masz uprawnień do edycji tego użytkownika' });
        }

        const updateData = {};
        if (email) {
            if (!validator.isEmail(email)) {
                return res.status(400).json({ error: 'Podany e-mail jest nieprawidłowy' });
            }
            updateData.email = email;
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        const result = await User.update(updateData, { where: {id: userId} });

        if (result[0] > 0) {
            res.json({ message: 'Dane użytkownika zostały zaktualizowane' });
        } else {
            res.status(404).json({ error: 'Nie znaleziono użytkownika' });
        }
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'Podany e-mail jest już zarejestrowany' });
        }
    }
});

app.get('/api/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

app.get('/api/users/:userId', authenticateJWT, async (req, res) => {
    const user = await User.findByPk(req.params.userId)

    if(req.userId !== parseInt(req.params.userId)) {
        return res.status(403).json({ error: 'Nie masz uprawnień do przeglądania tych danych'});
    }

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'Nie znaleziono użytkownika' });
    }
});