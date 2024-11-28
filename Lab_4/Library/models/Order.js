const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const Book = require('./Book');

const Order = sequelize.define('Order', {
    userId: { type: DataTypes.INTEGER, allowNull: false},
    bookId: { type: DataTypes.INTEGER, allowNull: false},
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1},
})

Order.belongsTo(Book, {foreignKey: 'bookId'})

module.exports = Order;