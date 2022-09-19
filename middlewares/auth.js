const jwt = require("jsonwebtoken")


module.exports = (req, res, next) => {
    // get the token
    try {
        let token = req.header("Authorization")
        if (!token) return res.status(401).send("Access denied. No token provided")

        //    check the token
        let payload = jwt.verify(token, process.env.secretKey)
        // save the payload
        req.payload = payload;
        next();

    } catch (error) {
        res.status(400).send("Invalid token")
    }

}