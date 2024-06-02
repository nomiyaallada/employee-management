const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// Create a new employee
router.post('/emps', async (req, res) => {
  try {
    // Check if a employee with the provided name already exists
    const existingEmp = await Employee.findOne({ name: req.body.name.toLowerCase() });
    if (existingEmp) {
      res.render('home', { message: 'A Employee with this name already exists' });
    } else {
      const newEmp = await Employee.create(req.body);
      res.render('home', { message: 'Employee created successfully' }); // Render home.ejs
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all employee or a single employee by name
router.get('/emps', async (req, res) => {
  try {
    if (req.query.name) {
      // A name is provided in the query string, find an employee by name
      const emp = await Employee.findOne({ name: req.query.name });
      if (emp) {
          const emps = [emp]; // Wrap single employee object into an array
          res.render('emps', { emps: emps }); // Render emps.ejs with the employee's data
      } else {
          res.render('home', { error: 'No Employee exists' });
      }
  }
  
  
  
    else {
      // No name is provided in the query string, return all employee
      const emps = await Employee.find();
      res.render('emps', { emps: emps }); // Render emps.ejs with all employee's data
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to open update-employee.ejs
router.get('/update-emp/:name', async (req, res) => {
  try {
    const emp = await Employee.findOne({ name: req.params.name });
    if (emp) {

      // Render the EJS template with the employee's data
      res.render('update-emp', { emp: emp });
      // res.render('update-employee's, { employee: employee });
    } else {
      res.status(404).send('Employee not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update a employee by name
router.patch('/emps/:name', async (req, res) => {
  try {
    const updatedEmp = await Employee.findOneAndUpdate({ name: req.params.name }, req.body, { new: true });
    if (updatedEmp) {
      res.status(200).json(updatedEmp);
    } else {
      res.status(404).json({ message: 'employee not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a employee by name
router.delete('/emps/:name', async (req, res) => {
  try {
    await Employee.findOneAndDelete({ name: req.params.name });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
