const User = require('../models/User');
const KanbanProject = require('../models/KanbanProjects');

const addUsers = async (req, res) => {

    const { id } = req.params;
    const { email } = req.body;

    try {

        const user = await User.findOne({ email });
        const project = await KanbanProject.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (project.users.includes(user._id)) {
            return res.status(409).json({ message: 'User already exists in this project' });
        }

        const updatedProject = await KanbanProject.findByIdAndUpdate(id, { $push: { users: user._id } }, { new: true });
        await updatedProject.save();

        res.status(200).json({ updatedProject });

    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

const removeUsers = async (req, res) => {

    const { id } = req.params;
    const { email } = req.body;

    try {

        const user = await User.findOne({ email });
        const project = await KanbanProject.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (!project.users.includes(user._id)) {
            return res.status(409).json({ message: 'User does not exists in this project' });
        }

        const updatedProject = await KanbanProject.findByIdAndUpdate(id, { $pull: { users: user._id } }, { new: true });
        await updatedProject.save();

        res.status(200).json({ updatedProject });

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

module.exports = {
    addUsers,
    removeUsers,
}