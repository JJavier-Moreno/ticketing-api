import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";

const STATES = ['open', 'in-progress', 'closed'];
const PRIORITY = ['low', 'medium', 'high'];

const ticketSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        required: true,
        unique: true,
    },
    user: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    state: {
        type: String,
        enum: STATES,
        default: 'open',
    },
    priority: {
        type: String,
        enum: PRIORITY,
        default: 'low',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
         required: true,
    },
    toJSON: {
        transform: function(doc, ret){
            delete ret.__v;
            delete ret._id;
        },
        virtuals: true,
    }
});

ticketSchema.index({id: 1}, {user: 1});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;