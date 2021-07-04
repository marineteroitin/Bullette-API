const Mongoose = require('mongoose');
require('dotenv').config()

Mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => {
        console.log('La connexion à MongoDB a échouée !')}
    );

const db = {
    mongoose: Mongoose,
};
export = db;
