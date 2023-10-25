module.exports = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // * = todos
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // Si el navegador envía OPTIONS, significa que está preguntando si puede enviar la petición
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET"); // Métodos permitidos
        return res.status(200).json({});
    }
    next();
}