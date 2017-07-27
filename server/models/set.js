const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const SetSchema = mongoose.Schema({
    name: String,
    youtubeUrl: String,
    smashggId: String
})
mongoose.model("Set", SetSchema)