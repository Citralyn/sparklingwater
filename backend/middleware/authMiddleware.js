const jwt = require('jsonwebtoken');

const approveToken = (req, res, next) => {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1]; // extract token

    try {
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded_token;

        next(); 
    } catch (e) {
        return res.status(403).json({
            message: "bad", e
        })
    }


};

module.exports = approveToken; 