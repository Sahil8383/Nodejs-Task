const mongoose = require('mongoose');

const KanbanColumnSchema = new mongoose.Schema({
    name: {
        type: String | 'New Column',
    },
    tasks: {
        type: Array,
        default: []
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'KanbanProject'
    }
},{
    collection: 'KanbanColumns'
});


const KanbanColumn = mongoose.model('KanbanColumn', KanbanColumnSchema);

module.exports = KanbanColumn;