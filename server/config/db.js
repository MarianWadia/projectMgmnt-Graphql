const mongoose = require('mongoose')

const connectDB = async () => {
    const connection = await mongoose.connect(process.env.DATABASE_URI)
    if(connection){
        console.log(
            `Database connection established successfully on host ${connection.connection.host}`
            .blue.underline.bold
        )
    }
}

module.exports = connectDB