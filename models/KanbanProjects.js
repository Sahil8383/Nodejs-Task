const mongoose = require('mongoose');

const KanbanProjectSchema = new mongoose.Schema({
    name: {
        type: String || 'New Project',
    },
    columns: [
        {
            name: {
                type: String,
                default: 'New Column'
            },
            tasks:[{
                title: {
                    type: String,
                    default: 'New Task'
                },
            }]
        }
    ],
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
        }
    ]
}, {
    collection: 'KanbanProjects'
});

const KanbanProject = mongoose.model('KanbanProject', KanbanProjectSchema);

module.exports = KanbanProject;