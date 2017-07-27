const path = require("path")
const sets = require('./../controllers/sets.js')

module.exports = (app) => {
    app.get('/get_sets', sets.getSets)
    app.get('/smashgg/:setId', sets.getSggApi)
    app.get("*", (req, res) => {
        res.sendFile(path.resolve('./public/dist/index.html')) // make angular name
    })
}