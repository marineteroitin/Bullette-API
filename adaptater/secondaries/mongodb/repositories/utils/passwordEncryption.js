const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 10;

module.exports.passwordEncryption = async (password) => {
    try {
        return await bcrypt.hash(password, SALT_ROUNDS);
    } catch (error) {
        throw error;
    }
};


