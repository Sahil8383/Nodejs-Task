const express = require('express');
const router = express.Router();

const { 
    SignUp, 
    LoginIn,
    authMiddleware,
} = require('../controllers/UserController');

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

const { 
    addUsers, 
    removeUsers 
} = require('../controllers/OnBoardingUsers');


router.get('/', (req, res) => {
    res.send('Hello World');
});


// User Routes

router.post('/signup', SignUp);
router.post('/login', LoginIn);

// Kanban Routes

router.get('/getProject',  authMiddleware , getAllProjects);
router.get('/getProject/:id', authMiddleware , getSingleProject);
router.post('/createProject', authMiddleware , createProject);
router.patch('/updateProject', authMiddleware , updateProject);
router.delete('/deleteProject/:id', authMiddleware , deleteProject);


// Columns Routes

router.get('/getColumns/:id',);
router.post('/createColumn/:id', authMiddleware ,createColumn);
router.delete('/projectId/:projId/columnId/:colId', authMiddleware ,deleteColumn);
router.patch('/updateColumn/:proId', authMiddleware ,updateColumn);


// Tasks Routes

router.get('/getTasks/:proId', authMiddleware ,getTasks);
router.post('/createTask/:proId', authMiddleware ,createTask);
router.delete('/deleteTask/:proId', authMiddleware ,deleteTask);
router.patch('/updateTask/:proId', authMiddleware ,updateTask);


// OnBoarding Routes
router.post('/addUsers/:id', authMiddleware ,addUsers);
router.patch('/removeUsers/:id', authMiddleware ,removeUsers);

module.exports = router;