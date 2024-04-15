const mongoose = require('mongoose')


const FraudSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    phone : String
})

const FraudModel = mongoose.model("Fraudcalls" , FraudSchema);

module.exports = FraudModel 