const jwt = require("jsonwebtoken");
const config = require("../config.json")

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        req.user = jwt.verify(token, config["SECRET.KEY"]);
    } catch (err) {
        return res.status(401).send({message: "Invalid Token"});
    }
    return next();
};

module.exports = verifyToken;