const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.status(401).json({ error: 'Brak tokenu autoryzacyjnego '});
    }

    try {
        const decoded = jwt.verify(token, 'sekretnyklucz');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Nieprawidłowy token '});
    }
};

module.exports = authenticateJWT;