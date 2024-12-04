const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./models/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authenticateJWT = require('./middlewares/auth');
const validator = require('validator');

const Book = require('./models/Book');
const Order = require('./models/Order');
const User = require('./models/User');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Witaj w naszej księgarni!');
});

sequelize.authenticate()
    .then(() => console.log('Połączono z SQLite (Użytkownicy)'))
    .catch((err) => console.error('Błąd połączenia z bazą danych (Użytkownicy)', err));

sequelize.sync({force: false})
    .then(() => console.log('Zsynchronizowano bazę danych (Użytkownicy)'))
    .catch((err) => console.error('Błąd synchronizacji (Użytkownicy)', err));

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

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Serwer obsługi użytkowników działa na http://localhost:${PORT}`);
});