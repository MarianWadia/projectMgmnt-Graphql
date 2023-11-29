const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed']
    },
    // This clientId will have type of objectId that is from another schema and in ref we specify which schema
    clientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }
})

module.exports = mongoose.model('Project', ProjectSchema)