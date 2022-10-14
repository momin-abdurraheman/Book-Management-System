const mongoose = require('mongoose');

function Dbconnection() {
    const DB_URL = process.env.MONGO_URI;

    mongoose.connect(DB_URL);

    // Detail of the above connection is saved inside variable named Db
    const db = mongoose.connection;

    // On will be called the whole time while once will be called only once 
    db.on("error", console.error.bind(console, "Connection error: "));
    db.once('open', function () {
        console.log("Database is connected ... ")

    })


};

module.exports = Dbconnection;