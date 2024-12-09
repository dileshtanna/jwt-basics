const jwt = require("jsonwebtoken");
const { USERS, USERS_PAYMENT_DETAILS } = require("./users");

const JWTPrivateKey = process.env.JWT_PRIVATE_KEY;

const getUser = (username, password) => {
    return USERS.find(u => u.username === username && u.password === password);
}

const getUserSavedPaymentDetails = (username) => {
    return USERS_PAYMENT_DETAILS[username];
}


const getJWT = (payload) => {
    // Create a payload using the secret key and set the validity of 30 mins
    return jwt.sign(payload, JWTPrivateKey, {
        expiresIn: "1d",
    });
};

module.exports = { getUser, getUserSavedPaymentDetails, getJWT }