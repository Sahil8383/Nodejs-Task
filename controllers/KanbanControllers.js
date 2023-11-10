const KanbanColumn = require('../models/KanbanColumn');
const KanbanTask = require('../models/KanbanTask');
const KanbanProject = require('../models/KanbanProjects');


// Project Controllers
const getSingleProject = async (req, res) => {

    const { id } = req.params;

    try {
        const project = await KanbanProject.findById(id);
        res.status(200).json({ project });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

const getAllProjects = async (req, res) => {

    try {
        const projects = await KanbanProject.find();
        res.status(200).json({ projects });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

const createProject = async (req, res) => {
    const { name } = req.body;
    try {
        const newProject = await KanbanProject.create(
            {
                name: name || 'New Project',
                columns: [],
                users: []
            }
        );
        res.status(201).json({ newProject });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProject = await KanbanProject.findByIdAndDelete(id);
        res.status(201).json({ deletedProject });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

const updateProject = async (req, res) => {

    const { id, name } = req.body;

    try {

        const updatedProject = await KanbanProject.findByIdAndUpdate(id, { name });
        await updatedProject.save();
        res.status(201).json({ updatedProject });

    } catch (error) {

        res.status(409).json({ message: error.message });

    }

}


// Columns Controllers

const createColumn = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    try {

        const project = await KanbanProject.findById(id);

        if (!project) return res.status(404).json({ message: 'Project not found' });

        project.columns.push({
            name: name || 'New Column',
            tasks: []
        });

        await project.save();

        res.status(201).json({ project });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


const deleteColumn = async (req, res) => {
    const projId = req.params.projId;
    const columnId = req.params.colId;

    try {

        const project = await KanbanProject.findById(projId);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        const coloumnIndex = project.columns.findIndex(col => col._id == columnId);
        if (coloumnIndex === -1) return res.status(404).json({ message: 'Column not found' });

        project.columns.splice(coloumnIndex, 1);

        await project.save();

        res.status(201).json({ project });

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateColumn = async (req, res) => {

    const { id, name } = req.body;
    const { proId } = req.params;
    try {

        const project = await KanbanProject.findById(proId);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        const coloumnIndex = project.columns.findIndex(col => col._id == id);
        if (coloumnIndex === -1) return res.status(404).json({ message: 'Column not found' });

        project.columns[coloumnIndex].name = name;

        await project.save();

        res.status(201).json({ project });

    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}



// Tasks Controllers


const getTasks = async (req, res) => {
    const { proId } = req.params;
    const { colId } = req.body;

    try {
        const project = await KanbanProject.findById(proId);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        const coloumnIndex = project.columns.findIndex(col => col._id == colId);
        if (coloumnIndex === -1) return res.status(404).json({ message: 'Column not found' });

        res.status(201).json({ tasks: project.columns[coloumnIndex].tasks });

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


const createTask = async (req, res) => {

    const { proId } = req.params;
    const { colId, title } = req.body;

    try {

        const project = await KanbanProject.findById(proId);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        const coloumnIndex = project.columns.findIndex(col => col._id == colId);
        if (coloumnIndex === -1) return res.status(404).json({ message: 'Column not found' });

        project.columns[coloumnIndex].tasks.push({
            title: title || 'New Task'
        });

        await project.save();

        res.status(201).json({ project });

    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}


const deleteTask = async (req, res) => {

    const { proId } = req.params;
    const { colId, taskId } = req.body;

    try {

        const project = await KanbanProject.findById(proId);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        const coloumnIndex = project.columns.findIndex(col => col._id == colId);
        if (coloumnIndex === -1) return res.status(404).json({ message: 'Column not found' });

        const taskIndex = project.columns[coloumnIndex].tasks.findIndex(task => task._id == taskId);
        if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });

        project.columns[coloumnIndex].tasks.splice(taskIndex, 1);

        await project.save();

        res.status(201).json({ project });

    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}


const updateTask = async (req, res) => {

    const { proId } = req.params;
    const { colId, taskId, title } = req.body;

    try {

        const project = await KanbanProject.findById(proId);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        const coloumnIndex = project.columns.findIndex(col => col._id == colId);
        if (coloumnIndex === -1) return res.status(404).json({ message: 'Column not found' });

        const taskIndex = project.columns[coloumnIndex].tasks.findIndex(task => task._id == taskId);
        if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });

        project.columns[coloumnIndex].tasks[taskIndex].title = title;

        await project.save();

        res.status(201).json({ project });

    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

module.exports = {
    getSingleProject,
    getAllProjects,
    createProject,
    deleteProject,
    updateProject,

    createColumn,
    deleteColumn,
    updateColumn,

    createTask,
    deleteTask,
    updateTask,
    getTasks
}