const mongoose = require('mongoose');
const Db = 'mongodb+srv://TimeShare:3NRiikZNdo9xm6ci@cluster0.4kjn4.mongodb.net/dev-pub-data?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(Db);
  }
  catch(err){
    console.log("Database connection error")
    process.exit(1);
  }
}

module.exports = connectDB;
