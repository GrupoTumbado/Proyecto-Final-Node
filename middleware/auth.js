const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Bearer token
        req.user = jwt.verify(token, "debugkey");
        next();
    } catch (error) {
        return res.status(401).send("No tienes permiso para ver esta información");
    }
}