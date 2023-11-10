const mongoose = require('mongoose');

const KanbanTaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    columnId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'KanbanColumn'
    },
},{
    collection: 'KanbanTasks'
});

const KanbanTask = mongoose.model('KanbanTask', KanbanTaskSchema);

module.exports = KanbanTask;