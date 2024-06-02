const express = require('express');
const router = express.Router();
const Leave = require('../models/leave');
const Employee = require('../models/employee');  

// Route to create a new leave
router.post('/leave', async (req, res) => {
    try {
        // Find the employee by name
        const employee = await Employee.findOne({ name: req.body.name });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        // Decrement the leave count
        employee.leavecount--;
        await employee.save();

        // Create the leave entry
        await Leave.create({
            name: req.body.name,
            reasontype: req.body.reasontype,
            reason: req.body.reason,
            startdate: req.body.startdate,
            enddate: req.body.enddate
        });

        // Redirect to a confirmation page
        res.redirect('/api/leave-sent');

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to display leave sent confirmation page
router.get('/leave-sent', (req, res) => {
    res.render('leave-sent'); // Assuming you have a view named 'leave-sent.ejs' for confirmation
});

router.get('/leave', async (req, res) => {
    try {
        const leaves = await Leave.find();
        res.render('leaves', { leaves: leaves });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
