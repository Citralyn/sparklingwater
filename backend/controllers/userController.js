const jwt = require('jsonwebtoken'); 

const getUser = (req, res) => {
    res.json({name: "Alice"});
}

const postUser = (req, res) => {
    const { user, password } = req.body; 

    const jwtPayload = {
        username: user,
        role: "user"
    }

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
        expiresIn: '2h'
    })

    res.json({
        token: token
    })
}

module.exports = { getUser, postUser };