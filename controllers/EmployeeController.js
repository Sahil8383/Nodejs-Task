const { Employee, employeeSchemaValidation } = require('../models/EmployeeModel');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcrypt');


/**
 * Middleware to authenticate requests using JWT token.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function.
 */
const authMiddleware = (req, res, next) => {

    const token = req.header('authorization');

    if (!token) {
        return res.status(401).json({ msg: 'Authorization denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_KEY);
        req.emp = decoded;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

/**
 * Create a new employee account.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const SignUp = async (req, res) => {
    try {

        const { error } = employeeSchemaValidation(req.body);
        if (error) {
            return res.status(400).json({ msg: error.details[0].message });
        }
        
        const { firstName, lastName, email, password, dateOfBirth, department, position } = req.body;
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);
        const user = await Employee.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            dateOfBirth,
            department,
            position
        });

        const token = jwt.sign({ id: user._id }, process.env.ACCESS_KEY);
        res.status(200).json({ access_token: token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Authenticate and obtain an access token.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const LoginIn = async (req, res) => {
    try {

        const { email, password } = req.body;

        const emp = await Employee.findOne({ email });

        if (!emp) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bycrypt.compare(password, emp.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign({ id: emp._id }, process.env.ACCESS_KEY);
        delete user.password;
        res.status(200).json({ access_token: token });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
}

/**
 * Retrieve a list of all employees with sorting, filtering, and pagination.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAllEmployees = async (req, res) => {
    try {
        let query = {};

        if (req.query.department) {
            query.department = req.query.department;
        }

        let sortQuery = {};
        if (req.query.sortBy) {
            sortQuery[req.query.sortBy] = req.query.sortOrder === 'desc' ? -1 : 1;
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const employees = await Employee.find(query).sort(sortQuery).skip(skip).limit(limit);
        res.status(200).json({ employees});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Retrieve details of a specific employee by ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getEmployeeById = async (req, res) => {
    try {

        const id = req.params.id;
        const employee = await Employee.findById(id);
        
        if(!employee){
            return res.status(404).json({msg: 'Employee not found'});
        }

        res.status(200).json({ employee });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Update details of an existing employee by ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateEmployee = async (req, res) => {
    try {

        const id = req.params.id;
        const { firstName, lastName, email, dob, department, position } = req.body;

        const employee = await Employee.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email,
            dob,
            department,
            position
        });

        await employee.save();

        res.status(200).json({ employee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Delete a specific employee by ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteEmployee = async (req, res) => {
    try {

        const id = req.params.id;
        const employee = await Employee.findByIdAndDelete(id);
        
        if(!employee){
            return res.status(404).json({msg: 'Employee not found'});
        }

        res.status(200).json({ employee });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    SignUp,
    LoginIn,
    authMiddleware,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
}