const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://zhffkwhdkp:bb020926@nodejs.fnazjbe.mongodb.net/?retryWrites=true&w=majority&appName=Nodejs";

module.exports = function(callback) {
    return MongoClient.connect(uri, callback);
};
