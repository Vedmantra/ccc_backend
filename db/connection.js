const mongoose = require("mongoose")

// vedmantrabhosale
// 3ecXwRXSVvfskjmL 

const connectDB = async () => {
    // mongoose.connect("mongodb://127.0.0.1:27017/ccc")
    // mongoose.connect("mongodb+srv://vedmantrabhosale:3ecXwRXSVvfskjmL@cluster1.xsohrvr.mongodb.net/?appName=Cluster1")
    mongoose.connect("mongodb+srv://vedmantrabhosale:3ecXwRXSVvfskjmL@cluster1.xsohrvr.mongodb.net/ccc?appName=Cluster1")
    // before ? write db name 
        .then(() => console.log('Mongodb Connected'))
        .catch(err => console.log(`Mongodb Connection Failed ${err}`))
}

module.exports = connectDB