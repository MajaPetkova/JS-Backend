const mongoose = require('mongoose');

const dbname = 'contacts-backend';
const connectionString = `mongodb://localhost:27017/contacts-backend${dbname}`;

const connectDb = async(app)=>{
        try {
            await mongoose.connect(connectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Database connected');
    
            mongoose.connection.on('error', (err) => {
                console.log('Database error');
            });
           
    }catch(err){
        console.log(err);
        process.exit(1) 
    }
}

module.exports = connectDb;