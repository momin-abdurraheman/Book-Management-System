const mongoose = require('mongoose');

function Dbconnection() {
    const DB_URL = process.env.MONGO_URI;


};

module.exports = Dbconnection;