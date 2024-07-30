const express = require('express');
const router = express.Router();
const connection = require('../../modules/dbconect');

router.post('/', async (req, res) => {
    const { role, name, lastname, idcard, formattedDate, email, password, phone, address } = req.body;
    const response = await fetch("http://localhost:4003/apiencrypt/" + email + "/" + password);
    if (response.ok) {
        const data = await response.json();
        const mail = data.mail;
        const pass = data.password;
        var query = 'INSERT INTO users (role, name, lastname, idcard, birthdate, mail, password, phone, address) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        connection.query(query, [role, name, lastname, idcard, formattedDate, mail, pass, phone, address], (err, results) => {
            if (err) {
                console.log("ERROR " + err.message);
                return res.status(500).json({ err: err.message });
            }
            if (results.affectedRows > 0) {
                res.status(201).json('Count successfully created');
            } else {
                res.status(404).json('User could not be created');
            }
        })
    }
});

module.exports = router;