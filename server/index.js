require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const { getUser, getJWT, getUserSavedPaymentDetails } = require("./helpers");

const auth = require("./middlewares/auth");

const app = express()

app.use(cors())
app.use(morgan("common"))
app.use(bodyParser.json())

app.use('/login', (req, res) => {
    const { username, password } = req.body;
    const userDetails = getUser(username, password);

    if (!userDetails) {
        return res.status(401).send("Invalid Credentials");
    }

    const jwt = getJWT({
        id: userDetails.id,
        username: userDetails.username,
        email: userDetails.email,
        // savedPayments: getUserSavedPaymentDetails(username)
    })

    res.status(200).json({
        statusCode: 200,
        message: 'Login Successful',
        token: jwt
    })
})

app.use('/test',
    auth,
    (req, res) => {
        res.status(200).send(`Request received from ${req?.user?.username}`)
    }
)

app.listen(4000, () => console.log(`Server is listening on port 5000`));