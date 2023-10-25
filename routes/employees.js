const express = require('express');
const employees = express.Router();
const db = require('../config/database');

employees.post('/', async (req, res, next) => {
    const {nombre, apellidos, telefono, mail, direccion} = req.body;
    if (nombre && apellidos && telefono && mail && direccion) {
        let query = "INSERT INTO empleados(nombre, apellidos, telefono, mail, direccion)";
        query += ` VALUES('${nombre}', '${apellidos}', ${telefono}, '${mail}', '${direccion}')`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({code: 201, message: "Empleado insertado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

employees.delete('/:id([0-9]{1,3})', async (req, res, next) => {
    const query = `DELETE
                   FROM empleados
                   WHERE id = ${req.params.id}`;
    const rows = await db.query(query);
    if (rows.affectedRows == 1) {
        return res.status(200).json({code: 200, message: "Empleado borrado correctamente"});
    }
    return res.status(404).json({code: 404, message: "Empleado no encontrado"});
});

employees.put('/:id([0-9]{1,3})', async (req, res, next) => {
    const {nombre, apellidos, telefono, mail, direccion} = req.body;

    if (nombre && apellidos && telefono && mail && direccion) {
        let query = `UPDATE empleados
                     SET nombre='${nombre}',
                         apellidos='${apellidos}',`;
        query += `telefono=${telefono}, mail='${mail}', direccion='${direccion}' WHERE id=${req.params.id};`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({code: 200, message: "Empleado actualizado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

employees.patch('/:id([0-9]{1,3})', async (req, res, next) => {
    if (req.body.nombre) {
        let query = `UPDATE empleados
                     SET nombre='${req.body.nombre}'
                     WHERE id = ${req.params.id};`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({code: 200, message: "Empleado actualizado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

employees.get('/', async (req, res, next) => {
    const employees = await db.query("SELECT * FROM empleados");
    return res.status(200).json({code: 1, message: employees});
});

employees.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    const employee = await db.query("SELECT * FROM empleados WHERE id=" + id + ";");
    if (employee.length > 0) {
        return res.status(200).json({code: 1, message: employee});
    }
    return res.status(404).send({code: 404, message: "Empleado no encontrado"});
});

employees.get('/:nombre([A-Za-z]+)', async (req, res, next) => {
    const nombre = req.params.nombre;
    const employee = await db.query("SELECT * FROM empleados WHERE nombre='" + nombre + "';");
    if (employee.length > 0) {
        return res.status(200).json({code: 1, message: employee});
    }
    return res.status(404).send({code: 404, message: "Empleado no encontrado"});
});

module.exports = employees;