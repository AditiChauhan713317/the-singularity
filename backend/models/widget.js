import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const widgetSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true, 
    },
    type: {
        type: String,
        required: true,
        index: true,
    },
    position: {
        x: {type: Number, required: true},
        y: {type: Number, required: true}, 
    },
    dimensions: {
        width: {type: Number, required: true},
        height: {type: Number, required: true}, 
    }, 
    config: {
        type: Object,
        required: true,
        default: {},
    }
}, {timestamps: true})

const widget = mongoose.model('Widget', widgetSchema);
export default widget;