const express = require('express');
const router = express.Router();
const { SignUp, LoginIn , getAllUsers} = require('../controllers/UserController');
const { 
    createColumn,
    deleteColumn,
    updateColumn,
    createProject,
    getAllProjects,
    deleteProject,
    updateProject,
    getSingleProject,
    createTask,
    deleteTask,
    updateTask,
    getTasks,
} = require('../controllers/KanbanControllers');


router.get('/', (req, res) => {
    res.send('Hello World');
});

// Kanban Routes

router.get('/getProject',getAllProjects);
router.get('/getProject/:id',getSingleProject);
router.post('/createProject',createProject);
router.patch('/updateProject',updateProject);
router.delete('/deleteProject/:id',deleteProject);


// Columns Routes

router.get('/getColumns/:id',);
router.post('/createColumn/:id',createColumn);
router.delete('/projectId/:projId/columnId/:colId',deleteColumn);
router.patch('/updateColumn/:proId',updateColumn);


// Tasks Routes

router.get('/getTasks/:proId',getTasks);
router.post('/createTask/:proId',createTask);
router.delete('/deleteTask/:proId',deleteTask);
router.patch('/updateTask/:proId',updateTask);


module.exports = router;