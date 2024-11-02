
require('dotenv').config();
const jwt = require('jsonwebtoken');



export default function jwtSecurity(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }
    try {
        const _ = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(400).send('Invalid token.');
    }    
}
