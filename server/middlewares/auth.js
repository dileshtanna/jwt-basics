
const jwt = require("jsonwebtoken");

const JWTPrivateKey = process.env.JWT_PRIVATE_KEY;

module.exports = (req, res, next) => {
    // Getting the authorization header from the request
    const bearerHeader = req.header("Authorization");
    if (!bearerHeader)
        return res.status(401).send("Access Denied. No token provided.");
    // Split the header to get the token and validate the token
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    if (!token) return res.status(401).send("Access Denied. No token provided.");

    try {
        // using jwt.verify to verify if it is a valid token
        const decoded = jwt.verify(token, JWTPrivateKey);

        // If customerID does not exist on the token, throw an error
        if (typeof decoded !== "object") {
            throw {};
        }
        // returns the value of the jwt if the token is verified
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).send("Invalid Token.");
    }
};
