const mongoose = require('mongoose');


const connectToDB = async () => {

    try {
        
        await mongoose.connect(process.env.MONGO_URI);

        console.log('connection to mongoDB successful...');

    } catch (error) {
        
        console.log(error);

    };

};


module.exports = {
    connectToDB
};