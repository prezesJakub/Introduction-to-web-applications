const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./models/database');

const Book = require('./models/Book');
const Order = require('./models/Order');
const User = require('./models/User')

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Witaj w naszej księgarni!');
});

sequelize.authenticate()
    .then(() => console.log('Połączono z SQLite (Zamówienia)'))
    .catch((err) => console.error('Błąd połączenia z bazą danych (Zamówienia)', err));

sequelize.sync({force: false})
    .then(() => console.log('Zsynchronizowano bazę danych (Zamówienia)'))
    .catch((err) => console.error('Błąd synchronizacji (Zamówienia)', err));

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
    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({ error: 'Użytkownik o podanym ID nie istnieje' });
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

    if(userId !== undefined) {
        const userExists = await User.findByPk(userId);
        if (!userExists) {
            return res.status(404).json({ error: 'Użytkownik o podanym ID nie istnieje' });
        }
        order.userId = userId;
    }
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

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Serwer obsługi zamówień działa na http://localhost:${PORT}`);
});