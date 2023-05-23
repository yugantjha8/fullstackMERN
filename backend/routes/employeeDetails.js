const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const { body, validationResult } = require('express-validator')

// Route 1-- get all emp details
router.get('/getAllEmployee', async (req, res) => {
    try {
        const employees = await Employee.find();
        return res.status(200).send(employees);
    } catch (e) {
        return res.status(400).send('Internal server error');
    }
})

// Route 2-- add new emp details
router.post('/addEmployee', [
    body('name', 'Name cannot be empty').notEmpty(),
    body('age', 'Please enter a valid number').isNumeric(),
    body('designation', 'Designation cannot be empty').notEmpty(),
    body('experience', 'Experience cannot be empty').notEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors);
        }
        const { name, age, designation, experience } = req.body;
        const newEmployee = new Employee({
            name, age, designation, experience
        })
        const savedEmp = await newEmployee.save();
        res.status(200).send(savedEmp);
    } catch (error) {
        return res.status(400).send('Internal server error');
    }
})

// Route 3-- delete emp details
router.delete('/deleteEmp/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(400).send("Employee not present");
        }
        await Employee.findByIdAndDelete(req.params.id);
        return res.status(200).send("Employee deleted successfully");
    } catch (error) {
        return res.status(400).send('Internal server error');
    }
})

// Route 4-- update employee
router.put('/updateemployee/:id', [
    body('name', 'Name cannot be empty').notEmpty(),
    body('age', 'Please enter a valid number').isNumeric(),
    body('designation', 'Designation cannot be empty').notEmpty(),
    body('experience', 'Experience cannot be empty').notEmpty()
],  async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors);
        }
        const employee = await Employee.findById(req.params.id);
        if (!employee) { 
            return res.status(400).send("Employee not present");
        }
        const { name, age, designation, experience } = req.body;
        const newEmployee = { name, age, designation, experience }
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, { $set: newEmployee }, { new: true });
        res.status(200).send(updatedEmployee);
    } catch (error) {
        res.status(400).send('Internal server error');
    }
})

module.exports = router;