const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/MiBasedeDatos', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`BD conectada`);

    } catch (error) {
        console.log(error);
        process.exit(1); //Detiene la app
    }
}

module.exports = conectarDB


// const MongoClient = require('mongodb').MongoClient;

// const URI = 'mongodb://127.0.0.1:27017/MiBasedeDatos';

// const conectarMongoDB = async () => {
//   console.log('Attempting to connect to MongoDB...');
//   try {
//     console.log('Using URI:', URI);
//     const client = await MongoClient.connect(URI);
//     console.log('MongoDB connected successfully');
//     return client.db('MiBasedeDatos'); // Return the database instance
//   } catch (err) {
//     console.error('Error connecting to MongoDB:', err);
//     throw err;
//   }
// };

// // Call the function immediately and export the promise
// const dbPromise = conectarMongoDB();

// module.exports = dbPromise;
