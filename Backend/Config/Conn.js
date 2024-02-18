const mongoose = require("mongoose")

const connection = (URI) => {
    mongoose.connect( URI , {
      useNewUrlParser:true,
      useUnifiedTopology:true
    }).then( () => {
        console.log("Database Connected")
    }).catch(err => {
        console.log(err)
    })

}

exports.connection = connection;
