const express = require('express');

const router = express.Router();

// Route to open home.ejs
router.get('/', (req, res) => {
    res.render('home');
});

// Route to open add-employee.ejs
router.get('/add-emp', (req, res) => {
    res.render('add-emp');
});

// Route to open employee.ejs
router.get('/viewemps', (req, res) => {
    res.render('emps');
});

// Route to open update-employee.ejs
router.get('/update-emp', (req, res) => {
    res.render('update-emp');
});

module.exports = router;