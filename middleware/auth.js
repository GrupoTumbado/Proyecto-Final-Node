const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Bearer token
        const decoded = jwt.verify(token, "debugkey");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send("No tienes permiso para ver esta información");
    }
}