const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const normalize = require('normalize-mongoose');

const memeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true
    }
});
//virtual 'id' field is already present in the Schema we just need to set it True
memeSchema.plugin(normalize);
// memeSchema.set('toJSON', {
//     virtuals: true
// });
const Meme = mongoose.model('meme', memeSchema);

module.exports = Meme;

