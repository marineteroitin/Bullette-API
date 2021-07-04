const db = require("../config/database");

const userSchema = db.mongoose.Schema({
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    emailConfirmed: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    googleId: {
        type: String
    },
});

module.exports = db.mongoose.model('User', userSchema);
