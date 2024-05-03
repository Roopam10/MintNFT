const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    address:String,
    
});

module.exports = mongoose.model("wallet",walletSchema)