const express = require('express');
const user = express.Router();
const db = require('../config/database');
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

user.post("/login", async (req, res, next) => {
    const {user, password} = req.body;

    if (!(user && password)) {
        return res.status(400).json({code: 400, message: "Campos incompletos"});
    }

    const query = `SELECT * FROM usuarios WHERE (username = '${user}' OR mail = '${user}') AND password = '${password}'`;
    const rows = await db.query(query);

    if (rows.length !== 1) {
        return res.status(200).json({code: 200, message: "Usuario y/o contraseña incorrectos"});
    }

    const token = jwt.sign({
        username: rows[0].username,
        mail: rows[0].mail
    }, "debugkey");

    return res.status(200).json({code: 200, message: token});
});

user.use(auth);
user.post('/register', async (req, res, next) => {
    const {username, mail, password, nickname} = req.body;

    if (!(username && mail && password)) {
        return res.status(500).json({code: 500, message: "Campos incompletos"});
    }

    let query = `INSERT INTO usuarios(username, mail, password, nickname) VALUES('${username}', '${mail}', '${password}', '${nickname ? nickname : username}')`;
    const rows = await db.query(query);

    if (rows.affectedRows !== 1) {
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }

    return res.status(201).json({code: 201, message: "Usuario registrado correctamente"});
});

module.exports = user;