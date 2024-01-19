const express = require('express');
const router = express.Router();

const { 
    SignUp, 
    LoginIn,
    authMiddleware,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
} = require('../controllers/EmployeeController');

// Employee Routes

router.post('/employee', SignUp);
router.post('/login', LoginIn);
router.get('/employees', authMiddleware, getAllEmployees);
router.get('/employee/:id', getEmployeeById);
router.patch('/employee/:id', updateEmployee);
router.delete('/employee/:id', deleteEmployee);

module.exports = router;