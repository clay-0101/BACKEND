const mongoose = require('mongoose')

const connectDB = async() => {
try {
   await mongoose.connect('mongodb+srv://sainicarry_db_user:0fQQ7RK5K53OELIM@carry-db.fagl7hu.mongodb.net/') 
   console.log('connect..')
} catch (error) {
   console.log('this error is occurs while connect DB', error) 
}
}

module.exports = connectDB