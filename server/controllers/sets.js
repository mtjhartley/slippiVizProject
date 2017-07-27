const mongoose = require("mongoose")
const Set = mongoose.model("Set")
const request = require('request')

module.exports = {
    getSets: (req, res, next) => {
        Set.find()
        .then(data => res.json(data))
        .catch(err => {res.status(500).json(err)})
    },
    getSggApi: (req, res, next) => {
        console.log(req.params)
        var setId = req.params['setId']
        request(`https://api.smash.gg/slippi/getBySet/${setId}`, function(error, response, body) {
            // console.log(req.body)

            // console.log("error", error)
            // console.log('statusCode:', response && response.statusCode)
            //console.log('body:', body)
            console.log(body.length)
            console.log(typeof(body))
            body = JSON.parse(body)
            console.log(typeof(body))
            console.log('this is the body above')
            res.json(body)

        })

    }
}